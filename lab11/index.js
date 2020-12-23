var canvas = document.getElementById("my-canvas");
var ctx = canvas.getContext("2d");

var TryitBtn = document.getElementById("btn");
TryitBtn.addEventListener("click", show);

var video = document.createElement("video");
video.setAttribute("src", "video.mp4");
video.addEventListener('play', function () {
  var $this = this;
  (function loop() {
    ctx.shadowColor = 'rgba(0,0,0, 0.5)';
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 10;
    ctx.drawImage($this, 50, 120, 700, 500);
    setInterval(loop, 20);
  })();
}, 0);

function show() {
  drawFace();
  drawText();
  showVideo();
}

function drawFace() {
  ctx.strokeStyle = "red";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(82, 50, 40, 0, 2*Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(64, 40, 10, 0, Math.PI, true);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(100, 40, 10, 0, Math.PI, true);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(64,70);
  ctx.lineTo(100,70);
  ctx.stroke();
}
function drawText() {
  ctx.font = "italic bold 40px Geogia, serif";
  ctx.fillStyle = "blue";
  ctx.fillText("Merry Christmas!!", 150, 60);
}
function showVideo() {
  video.play();
}

// setInterval(function(){ alert("Hello"); }, 3000);