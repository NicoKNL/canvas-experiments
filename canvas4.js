console.log('Canvas2 test');

var canvas = document.querySelector('canvas');
console.log(canvas);

// Fullscreen canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Store 2d context in c
var c = canvas.getContext('2d');


var mouse = {
  x: undefined,
  y: undefined
}

var colorArray = [
  '#58CCB6',
  '#5070B5',
  '#FFD470',
  '#FF9166',
]


window.addEventListener('mousemove',
  function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize',
  function(event) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  window.addEventListener('click',
    function(event) {
      console.log('click!');
      var circle = new Circle(event.x, event.y, 40, 30, 30);
      circles.push(circle);
    });

function Circle(x, y, radius, dx, dy) {
  this.x = x;
  this.y = y;
  this.default_radius = radius;
  this.radius = radius;
  this.dx = dx;
  this.dy = dy;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  this.getPosition = function() {
    return {
      'x': this.x,
      'y': this.y
    }
  };

  this.getVelocity = function() {
    return {
      'x': this.dx,
      'y': this.dy
    }
  };

  this.setPosition = function(position) {
    this.x = position.x,
    this.y = position.y
  };

  this.setVelocity = function(velocity) {
    this.dx = velocity.x,
    this.dy = velocity.y
  };

  this.drawCollider = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = 'Red';
    c.stroke();
  }

  this.getRadius = function() {
    return this.radius;
  }
}

function PhysicsEngine2D(dynamicRbds, staticRbds, windowIsCollider) {
  this.staticRbds = staticRbds;
  this.dynamicRbds = dynamicRbds;

  this.allRbds = this.dynamicRbds;
  this.allRbds.concat(this.staticRbds);

  this.windowIsCollider = windowIsCollider;
  this.gravity = 9.81;
  this.collisionSteps = 3;
  this.debug = true;

  this.step = function() {
    // Resolve collision first
    this.resolveCollisions();

    // Calculate new velocities for each rbd
    for (var i = 0; i < this.dynamicRbds.length; i++) {
      var rbd = this.dynamicRbds[i];
      var position = rbd.getPosition();
      var velocity = rbd.getVelocity();

      var newPosition = {
        'x': position.x + velocity.x ,
        'y': position.y + velocity.y
      };

      rbd.setPosition(newPosition);
      rbd.draw(); // Draw the specific RBD

      // Draw colliders feature for debugging
      if (this.debug) {
        rbd.drawCollider();
      }
    }

  };

  this.updateVelocities = function() {
    for (var i = 0; i < this.dynamicRbds.length; i++) {
      console.log('velocity: ' + i);
    }
  };

  this.resolveCollisions = function() {
    for (var i = 0; i < this.collisionSteps; i++) {
      for (var j = 0; j < this.dynamicRbds.length; j++) {
        for (var k = 0; k < this.allRbds.length; k++) {
          var objA = this.dynamicRbds[j];
          var objB = this.allRbds[k];
          // Ignore self-check
          if (objA === objB) {
            continue;
          }

          var posA = objA.getPosition();
          var posB = objB.getPosition();

          var distance = distance2D(posA, posB);
          // This can be done simpler...
          if (distance < objA.getRadius() || distance < objB.getRadius()) {
            var velA = objA.getVelocity();
            var newVelocity = {
              'x': -velA.x,
              'y': -velA.y
            }
            var newPosition = {
              'x': posA.x + newVelocity.x,
              'y': posA.y + newVelocity.y
            }
            objA.setVelocity(newVelocity);
          }
        }
      }
    }
  }
}

function distance2D(a, b) {
  var deltaX = Math.abs(a.x - b.x);
  var deltaY = Math.abs(a.y - b.y);
  var distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
  return distance;
}


var lastCalledTime;
var fps;
var maxfps = 0;
var resetMax = 0;

function showFPS(){
    c.fillStyle = "White";
    c.strokeStyle = "Black";
    c.font      = "normal 22pt Arial";

    c.strokeText(fps + " fps", 10, 26);
    c.fillText(fps + " fps", 10, 26);
    c.strokeText(maxfps + " max fps", 10, 60);
    c.fillText(maxfps + " max fps", 10, 60);
}

var circles = [];

for (var i = 0; i < 100; i++) {
  var radius = Math.random() * 8 + 10;
  var x = radius + Math.random() * (window.innerWidth - radius * 2);
  var y = radius + Math.random() * (window.innerHeight - radius * 2);
  var directionX = Math.random() < 0.5 ? -1 : 1;
  var directionY = Math.random() < 0.5 ? -1 : 1;
  var dx = Math.random() * 3 * directionX;
  var dy = Math.random() * 3 * directionY;

  var circle = new Circle(x, y, radius, dx, dy);
  circles[i] = circle;
}

// Create PhysicsEngine2D
var engine2D = new PhysicsEngine2D(circles, []);

function animate() {
  requestAnimationFrame(animate);

  // Reset canvas
  c.clearRect(0, 0, innerWidth, innerHeight);
  c.fillStyle = '#FFFFFF';
  c.fillRect(0, 0, canvas.width, canvas.height);

  engine2D.step();
  /*for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];
    circle.update();
  }*/


  // FPS LOGIC
  if(!lastCalledTime) {
    lastCalledTime = performance.now();
  }
  var delta = (performance.now() - lastCalledTime)/1000;
  lastCalledTime = performance.now();
  fps = Math.round(1/delta);
  if (fps > maxfps && fps != Infinity) {
    maxfps = fps;
  }

  if (resetMax === 120) {
    maxfps = fps;
    resetMax = 0;
  }
  resetMax += 1;
  showFPS();
  // console.log('increment');


}

animate();
