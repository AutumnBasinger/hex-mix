let canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 800;
let ctx = canvas.getContext('2d');
ctx.scale(4,4);

function makeCircle(divisions, position, color) {
  position = position-divisions/4;
  let deg = 360/divisions;
  let rad = (position*deg*2*Math.PI)/360;
  r = 75;
  let x = r * Math.cos(rad) + 100;
  let y = r * Math.sin(rad) + 100;
  drawCircle(x,y,15,0,color);
}

function drawCircle(x,y,radius,start,color){
  ctx.beginPath();
  ctx.arc(x,y,radius,start,2*Math.PI);
  ctx.fillStyle = "rgb(" + color + ")"
  ctx.fill();
}

function populate(){
  for (let i = 0; i < 12 ; i++) {
    makeCircle(12,i,[backSec,backMin,backHour]);
  }
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

  backSec = 256-rgbSec;
  backMin = 256-rgbMin;
  backHour = 256-rgbHour;

  drawCircle(100,100,80,0,[rgbHour, rgbMin, rgbSec]);

  if (currentSec % 5 === 0) {
    makeCircle(12, currentSec/5, [rgbHour, rgbMin, rgbSec]);
  }
}

onSecond();

let timerID = setInterval(onSecond, 1000);
