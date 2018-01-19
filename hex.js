let colorOutput = document.getElementById('colorOutput');
let clock = document.getElementById('clock');

function Circle(value){
  this.value = value;
  this.div = document.createElement('div');
  this.div.className = 'circle';
  this.div.style.backgroundColor = "rgb(" + this.value + ")";
}

function makeCircle(value){
  let circle = new Circle(value);
  clock.append(circle.div);
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

  if (currentSec % 5 === 0) {
    makeCircle([rgbHour, rgbMin, rgbSec]);
  }

  colorOutput.style.backgroundColor = "rgb(" + [rgbHour, rgbMin, rgbSec] + ")";
}

onSecond();

let timerID = setInterval(onSecond, 1000);
