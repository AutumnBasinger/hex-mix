let all = document.getElementById('all');

let canvas = document.getElementById('canvas');
canvas.width = 1200;
canvas.height = 1200;
let ctx = canvas.getContext('2d');
ctx.scale(6,6);

let rgbTime = document.getElementById('rgbTime');

saveColor = [];
saveSec = [];

function makeCircle(divisions, position, color, offset, size) {
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
  makeCircle(60, secs[i], rgbs[i], 50, 3);
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
  let erase = [255,255,255];

  backSec = 255-rgbSec;
  backMin = 255-rgbMin;
  backHour = 255-rgbHour;

  let backwards = [rgbSec, rgbMin, rgbHour];

  rgbTime.innerHTML = dbHour + ':' + dbMin + ':' + dbSec;
  rgbTime.style.color = "rgb(" + db  + ")";

  drawCircle(100,100,75,0,db); //main circle

  //if (currentSec % 5 === 0) {
  //  makeCircle(12, currentSec/5, rgb, 50, 12);
  //  if (saveColor.length === 30) {
  //    //
  //  }
  //  makeCircle(12, currentSec/5, rgb, 50, 12);
  //  saveSec.push(currentSec);
  //  saveColor.push(rgb);
  //}

  //for (i = 0; i < saveSec.length; i++) {
  //  makeCircle(12, saveSec[i]/5, saveColor[i], 50, 12);
  //}
}

onSecond();

let timerID = setInterval(onSecond, 1000);

function printAll() {
  h = 0;
  m = 0;
  s = 0;
  while (h < 24) {
    outputDB(h,m,s);
    s += 1;
    if (s === 60) {
      m += 1;
      s = 0;
      if (m === 60) {
        h += 1;
        m = 0;
      }
    }
  }
}

  function output(h,m,s) {
    tick = 256/60;
    tock = 256/24;
    rgbS = Math.round(tick*s);
    rgbM = Math.round(tick*m + rgbS/60);
    rgbH = Math.round(tock*h + rgbM/60);
    rgb = [rgbH,rgbM,rgbS];
    let elem = document.createElement('div');
    elem.className = 'circle';
    elem.style.backgroundColor = 'rgb(' + rgb + ')';
    all.append(elem);
  }

  function outputDB(h,m,s) {
    ticked = 512/60; //double cycle 8.53
    tocked = 512/24; //double cycle 21.33
    if (s > 30) {
      dbSec = Math.abs(Math.round(ticked*s - 512));
    } else {dbSec = Math.round(ticked*s);}
    if (m > 30) {
      dbMin = Math.abs(Math.round((ticked*m - 512) + dbSec/60));
    } else {dbMin = Math.round(ticked*m + dbSec/60);}
    if (h > 12) {
      dbHour = Math.abs(Math.round((tocked*h - 512) + dbMin/60));
    } else {dbHour = Math.round(tocked*h + dbMin/60);}
    db = [dbHour, dbMin, dbSec];
    let elem = document.createElement('div');
    elem.className = 'circle';
    elem.style.backgroundColor = 'rgb(' + db + ')';
    all.append(elem);
  }

  printAll();
