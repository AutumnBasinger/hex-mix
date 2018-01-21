let canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 800;
let ctx = canvas.getContext('2d');
ctx.scale(4,4);

function getCoordinates(divisions, number) {
  let deg = 360/divisions; //30
  let rad = (number*deg*2*Math.PI)/360;
  r = 90;
  let x = r * Math.cos(rad) + 100;
  let y = r * Math.sin(rad) + 100;
  makeCircle(x,y,10,0,[backSec,backMin,backHour]);
}

function makeCircle(x,y,radius,start,color){
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

  backSec = 256-rgbSec;
  backMin = 256-rgbMin;
  backHour = 256-rgbHour;

  makeCircle(100,100,100,0,[rgbHour, rgbMin, rgbSec]);
  getCoordinates(12,4);
}

onSecond();

let timerID = setInterval(onSecond, 1000);
