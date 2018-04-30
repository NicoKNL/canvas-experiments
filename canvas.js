console.log('Canvas test');

var canvas = document.querySelector('canvas');
console.log(canvas);

// Fullscreen canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Store 2d context in c
var c = canvas.getContext('2d');

// Rectangle
c.fillStyle = 'rgba(0, 255, 0, 0.5)';
c.fillRect(100, 100, 100, 100);

// Line
c.beginPath();
c.moveTo(50, 300);
c.lineTo(300, 100);
c.lineTo(400, 300);
c.strokeStyle = "#faa3a3";
c.stroke();

// Arc / Circle
c.beginPath(); // To prevent jumping from previous position of context
c.arc(300, 300, 100, 0, Math.PI * 2, false); // false = not in reverse
c.strokeStyle = 'blue';
c.stroke();


for (var i = 0; i < 30; i++) {
  var x = Math.random() * window.innerWidth;
  var y = Math.random() * window.innerHeight;

  c.beginPath(); // To prevent jumping from previous position of context
  c.arc(x, y, 50, 0, Math.PI * 2, false); // false = not in reverse
  c.strokeStyle = 'blue';
  c.stroke();
}
