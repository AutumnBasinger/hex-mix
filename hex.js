let canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 800;
let ctx = canvas.getContext('2d');
ctx.scale(4,4);

let rgbTime = document.getElementById('rgbTime');

let secs = [];
let rgbs = [];

function makeCircles(divisions, position, color, offset, size) {
  position = position-divisions/4;
  let deg = 360/divisions;
  let rad = (position*deg*2*Math.PI)/360;
  let x = offset * Math.cos(rad) + 100;
  let y = offset * Math.sin(rad) + 100;
  drawCircle(x,y,size,0,color);
}

function drawCircle(x,y,radius,start,color){
  ctx.beginPath();
  ctx.arc(x,y,radius,start,2*Math.PI);
  ctx.fillStyle = "rgb(" + color + ")"
  ctx.fill();
}

function onSecond() {
  let time = new Date();
  currentSec = time.getSeconds(); //current second
  currentMin = time.getMinutes(); //current minute
  currentHour = time.getHours(); //current hour

  tic = 256/60; //change in RGB value per 1 cycle out of 60
  tock = 256/24; //change in RGB value per 1 cycle out of 24

  rgbSec = Math.round(tic*currentSec);
  rgbMin = Math.round(tic*currentMin + rgbSec/60);
  rgbHour = Math.round(tock*currentHour + rgbMin/60);

  rgb = [rgbHour, rgbMin, rgbSec];

  backSec = 255-rgbSec;
  backMin = 255-rgbMin;
  backHour = 255-rgbHour;

  let backwards = [backHour, backMin, backSec];

  drawCircle(100,100,80,0,rgb);

  rgbTime.innerHTML = rgbHour + ':' + rgbMin + ':' + rgbSec;
  rgbTime.style.color = "rgb(" + backwards  + ")";

  if (currentSec % 5 === 0) {
    if (secs.length === 12) { ///don't crash
    }
    makeCircles(12, currentSec/5, rgb, 62, 15); //divisions, position, color, offset, size
    secs.push(currentSec);
    rgbs.push(rgb);
  }

  for (i = 0; i < secs.length; i++) {
    makeCircles(12, secs[i]/5, rgbs[i], 62, 15);
  }
}

onSecond();

let timerID = setInterval(onSecond, 1000);
