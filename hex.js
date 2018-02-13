let canvas = document.getElementById('canvas');
canvas.width = 1200;
canvas.height = 1200;
let ctx = canvas.getContext('2d');
ctx.scale(6,6);

let rgbTime = document.getElementById('rgbTime');
let realTime = document.getElementById('realTime');

function drawCircle(x,y,radius,center,color){
  ctx.beginPath();
  ctx.arc(x,y,radius,center,2*Math.PI);
  ctx.fillStyle = "rgb(" + color + ")"
  ctx.fill();
}

function main() {
  let time = new Date();
  currentSec = time.getSeconds();
  currentMin = time.getMinutes();
  currentHour = time.getHours();
  totalSec = currentSec + currentMin*60 + currentHour*60*60

  let tick = 256/60; //change in RGB value per 1 cycle out of 60
  let tock = 256/24; //change in RGB value per 1 cycle out of 24

  rgbSec = Math.round(tick*currentSec);
  rgbMin = Math.round(tick*currentMin + rgbSec/60);
  rgbHour = Math.round(tock*currentHour + rgbMin/60);

  let rgb = [rgbHour, rgbMin, rgbSec];
  let white = [255,255,255]

  if (totalSec <= 43200){ //43200 is half the number of seconds in a day
    size = (totalSec/432);
  } else {
    size = Math.abs(100 - (totalSec/432 - 100))
  }

  realTime.innerHTML = currentHour + ':' + currentMin + ':' + currentSec;
  realTime.style.color = "rgb(" + white  + ")";
  drawCircle(100,100,100,0,white); //refresh circle, 100 r is max canvas
  drawCircle(100,100,size,0,rgb); //main circle
  document.body.style.backgroundColor = "rgb(" + rgb  + ")";
  rgbTime.innerHTML = rgbHour + ':' + rgbMin + ':' + rgbSec;
  rgbTime.style.color = "rgb(" + white  + ")";
}

main();

let timerID = setInterval(main, 100); //10th of a second
