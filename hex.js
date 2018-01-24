let canvas = document.getElementById('canvas');
canvas.width = 1200;
canvas.height = 1200;
let ctx = canvas.getContext('2d');
ctx.scale(6,6);

let rgbTime = document.getElementById('rgbTime');

min = [];
minColor = [];

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

function inFront(){
  for (i = 0; i < secs.length; i++) {
  makeCircles(60, secs[i], rgbs[i], 50, 3);
  }
}

function onSecond() {
  let time = new Date();
  currentSec = time.getSeconds(); //current second
  currentMin = time.getMinutes(); //current minute
  currentHour = time.getHours(); //current hour

  tick = 256/60; //change in RGB value per 1 cycle out of 60
  tock = 256/24; //change in RGB value per 1 cycle out of 24

  rgbSec = Math.round(tick*currentSec);
  rgbMin = Math.round(tick*currentMin + rgbSec/60);
  rgbHour = Math.round(tock*currentHour + rgbMin/60);

  let rgb = [rgbHour, rgbMin, rgbSec];

  ticked = 512/60; //double cycle 8.53
  tocked = 512/24; //double cycle 21.33

  if (currentSec > 30) {
    dbSec = Math.abs(Math.round(ticked*currentSec - 512));
  } else {dbSec = Math.round(ticked*currentSec);}

  if (currentMin > 30) {
    dbMin = Math.abs(Math.round((ticked*currentMin - 512) + dbSec/60));
  } else {dbMin = Math.round(ticked*currentMin + dbSec/60);}

  if (currentHour > 12) {
    dbHour = Math.abs(Math.round((tocked*currentHour - 512) + dbMin/60));
  } else {dbHour = Math.round(tocked*currentHour + dbMin/60);}

  let db = [dbHour, dbMin, dbSec];

  backSec = 255-rgbSec;
  backMin = 255-rgbMin;
  backHour = 255-rgbHour;

  let backwards = [rgbSec, rgbMin, rgbHour];

  drawCircle(100,100,70,0,db); //main circle
  rgbTime.innerHTML = dbHour + ':' + dbMin + ':' + dbSec;
  rgbTime.style.color = "rgb(" + db  + ")";

  makeCircles(60, currentSec, db, 80, 5);
  //inFront();

  if (currentSec === 0) {
    min.splice(0,1);
    minColor.splice(0,1);
    makeCircles(60, currentMin, db, 40, 20);
    min.push(currentMin);
    minColor.push(db);
  }

  makeCircles(60, min[0], minColor[0], 40, 20);
}

onSecond();

let timerID = setInterval(onSecond, 1000);
