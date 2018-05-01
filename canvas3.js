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
  '#485058',
  '#A6A5A1',
  '#F1ECE9',
  '#D7443F',
]


window.addEventListener('mousemove',
  function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
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

  this.update = function() {
    if ((this.x + this.radius) > window.innerWidth || (this.x - this.radius) < 0) {
      this.dx *= -1; // Invert
    }

    if ((this.y + this.radius) > window.innerHeight || (this.y - this.radius) < 0) {
      this.dy *= -1; // Invert
    }

    this.x += this.dx;
    this.y += this.dy;

    // interactivity
    if ( Math.abs(mouse.x - this.x) < 100 && Math.abs(mouse.y - this.y) < 50 && this.radius <= 100) {
      this.radius += 2;
    } else if (this.radius >= this.default_radius) {
      this.radius -= 2;
    } else {
      this.radius = this.radius;
    }
    this.draw();
  }
}

var circles = [];

for (var i = 0; i < 1000; i++) {
  var radius = Math.random() * 8 + 2;
  var x = radius + Math.random() * (window.innerWidth - radius * 2);
  var y = radius + Math.random() * (window.innerHeight - radius * 2);
  var directionX = Math.random() < 0.5 ? -1 : 1;
  var directionY = Math.random() < 0.5 ? -1 : 1;
  var dx = Math.random() * 3 * directionX;
  var dy = Math.random() * 3 * directionY;

  var circle = new Circle(x, y, radius, dx, dy);
  circles[i] = circle;
}



function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  c.fillStyle = '#333A42';
  c.fillRect(0, 0, canvas.width, canvas.height)
  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];
    circle.update();
  }

  // console.log('increment');


}

animate();
