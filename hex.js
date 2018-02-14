let realTime = document.getElementById('realTime');
let canvas = document.getElementById('canvas');
let rgbTime = document.getElementById('rgbTime');

canvas.width = 1200; canvas.height = 1200;
let ctx = canvas.getContext('2d'); ctx.scale(6,6);

//divisions, which divison (0 is 12:00), distance from center
function position(div,pos,ofs) {
  pos = pos-div/4;
  let deg = 360/div;
  let rad = (pos*deg*2*Math.PI)/360;
  let x = ofs*Math.cos(rad)+100;
  let y = ofs*Math.sin(rad)+100;
  return [x,y];
}

function drawCircle(x,y,radius,color){
  ctx.beginPath();
  ctx.arc(x,y,radius,0,2*Math.PI);
  ctx.fillStyle = "rgb(" + color + ")"
  ctx.fill();
}

function lineCenterTo(x,y,width,color) {
  ctx.beginPath();
  ctx.moveTo(100,100);
  ctx.lineTo(x,y);
  ctx.lineWidth = width;
  ctx.strokeStyle = "rgb(" + color + ")";
  ctx.stroke();
}

function main() {
  let time = new Date();
  currentSec = time.getSeconds();
  currentMin = time.getMinutes();
  currentHour = time.getHours();
  totalSec = currentSec + currentMin*60 + currentHour*60*60

  let tick = 256/60; //change in RGB per 1 cycle out of 60
  let tock = 256/24; //change in RGB per 1 cycle out of 24
  rgbSec = Math.round(tick*currentSec);
  rgbMin = Math.round(tick*currentMin + rgbSec/60);
  rgbHour = Math.round(tock*currentHour + rgbMin/60);
  let rgb = [rgbHour, rgbMin, rgbSec];
  let white = [255,255,255];

  if (totalSec <= 43200){ //half of 86400 seconds in a day
    size = (totalSec/432);
  } else {
    size = Math.abs(100 - (totalSec/432 - 100))
  }

  realTime.innerHTML = currentHour + ':' + currentMin + ':' + currentSec;
  rgbTime.innerHTML = rgbHour + ':' + rgbMin + ':' + rgbSec;
  document.body.style.backgroundColor = "rgb(" + rgb  + ")";

  drawCircle(100,100,100,white);
  drawCircle(100,100,size,rgb);
  let hour = position(12,currentHour,size);
  lineCenterTo(hour[0],hour[1],1,white);
}

main();

let timerID = setInterval(main, 100); //10th of a second
