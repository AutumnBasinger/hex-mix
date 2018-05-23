let realTime = document.getElementById('realTime');
let canvas = document.getElementById('canvas');
let rgbTime = document.getElementById('rgbTime');

canvas.width = 1200; canvas.height = 1200;
let ctx = canvas.getContext('2d'); ctx.scale(6,6);

//number of divisions, which divison (0 is 12:00), distance from center
function position(div,pos,ofs) {
  pos = pos - (div/4);
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

function lineFromTo(x1,y1,x2,y2,width,color) {
  ctx.beginPath();
  ctx.moveTo(x1,y1); //100,100 for center
  ctx.lineTo(x2,y2);
  ctx.lineWidth = width;
  ctx.strokeStyle = "rgb(" + color + ")";
  ctx.stroke();
}

function main() {
  let time = new Date();
  currentSec = time.getSeconds();
  currentMin = time.getMinutes();
  currentHour = time.getHours();
  secsSoFar = currentSec + currentMin*60 + currentHour*60*60

  let tick = 256/60; //change in RGB per 1 cycle out of 60
  let tock = 256/24; //change in RGB per 1 cycle out of 24
  rgbSec = Math.round(tick*currentSec);
  rgbMin = Math.round(tick*currentMin + rgbSec/60);
  rgbHour = Math.round(tock*currentHour + rgbMin/60);
  let rgb = [rgbHour, rgbMin, rgbSec];
  let white = [255,255,255];
  let black = [0,0,0];

  let secsInDay = 86400;
  let maxRadius = 96
  let factor = secsInDay/maxRadius/2

  if (currentMin < 10) {viewMin = '0' + currentMin;
  } else {viewMin = currentMin;}

  if (currentSec < 10) {viewSec = '0' + currentSec;
  } else {viewSec = currentSec;}

  if (secsSoFar <= secsInDay/2){ //43200
    size = (secsSoFar/factor);
    realTime.innerHTML = currentHour + ':' + viewMin + ':' + viewSec + ' AM';
  } else {
    size = Math.abs(maxRadius - (secsSoFar/factor - maxRadius));
    realTime.innerHTML = currentHour - 12 + ':' + viewMin + ':' + viewSec + ' PM';
  }

  rgbTime.innerHTML = rgbHour + ':' + rgbMin + ':' + rgbSec + ' RGB'
  document.body.style.backgroundColor = "rgb(" + rgb  + ")";

  drawCircle(100,100,100,white);
  drawCircle(100,100,size,rgb);

  midOffset = size + (100-size)/2 //min 50, max 98
  inOffset = size + 2
  outOffset = 98
  let hourDot = position(secsInDay/2,secsSoFar,midOffset); //43200, 0 to 86400
  let minDot = position(60,currentMin,midOffset);
  drawCircle(hourDot[0],hourDot[1],2,black);
  drawCircle(100,100,0.5,black);
  //drawCircle(minDot[0],minDot[1],2,black);
  //drawCircle(secDot[0],secDot[1],3,black);

}

main();

let timerID = setInterval(main, 100); //10th of a second
