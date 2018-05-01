console.log('Canvas2 test');

var canvas = document.querySelector('canvas');
console.log(canvas);

// Fullscreen canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Store 2d context in c
var c = canvas.getContext('2d');



function Circle(x, y, radius, dx, dy) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.dx = dx;
  this.dy = dy;

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // c.strokeStyle = 'blue';
    // c.stroke();
    c.fillStyle = 'rgba(100, 100, 255, 0.1)';
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

    this.draw();
  }
}

var circles = [];

for (var i = 0; i < 100; i++) {
  var radius = 150;
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

  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];
    circle.update();
  }

  // console.log('increment');


}

animate();
