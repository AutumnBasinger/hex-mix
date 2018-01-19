let colorOutput = document.getElementById('colorOutput');
let minuteColor = document.getElementById('minuteColor');

function main() {
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

  colorOutput.style.backgroundColor = "rgb(" + [rgbHour, rgbMin, rgbSec] + ")";
  minuteColor.style.backgroundColor = "rgb(" + [backHour, backMin, backSec] + ")";
}

main();

let timerID = setInterval(main, 1000);
