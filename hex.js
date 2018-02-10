let canvas = document.getElementById('canvas');
canvas.width = 1200;
canvas.height = 1200;
let ctx = canvas.getContext('2d');
ctx.scale(6,6);

let rgbTime = document.getElementById('rgbTime');
let time = document.getElementById('realTime');

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

  let tick = 256/60; //change in RGB value per 1 cycle out of 60
  let tock = 256/24; //change in RGB value per 1 cycle out of 24

  rgbSec = Math.round(tick*currentSec);
  rgbMin = Math.round(tick*currentMin + rgbSec/60);
  rgbHour = Math.round(tock*currentHour + rgbMin/60);

  let rgb = [rgbHour, rgbMin, rgbSec];

  ticked = 512/60; //double cycle 8.53
  tocked = 512/24; //double cycle 21.33

  rgbTime.innerHTML = rgbHour + ':' + rgbMin + ':' + rgbSec;
  rgbTime.style.color = "rgb(" + rgb  + ")";
  realTime.innerHTML = currentHour + ':' + currentMin + ':' + currentSec;
  realTime.style.color = "rgb(" + rgb  + ")";

  x = 100;
  y = 100;
  r = Math.round(currentMin + currentSec)

  drawCircle(x,y,60,0,rgb); //main circle
}

onSecond();

let timerID = setInterval(onSecond, 1000);
