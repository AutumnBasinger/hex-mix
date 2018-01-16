let colorOutput = document.getElementById('colorOutput');

var time = new Date();
hour = time.getHours();
minute = time.getMinutes();
second = time.getSeconds();
console.log(hour, minute, second);

function secondToColor() {
  newSecond = Math.round(second * 4.26);
  return newSecond;
}

function minuteToColor() {
  newMinute = Math.round((minute * 4.26) + (secondToColor()/60))
  return newMinute;
}

function hourToColor() {
  newHour = Math.round((hour * 10.66) + (minuteToColor()/60) + (secondToColor()/60/60));
  console.log(newHour, newMinute, newSecond);
  return newHour;
}

function showColor() {
  colorOutput.style.backgroundColor = "rgb(" + [newHour, newMinute, newSecond] + ")";
}

secondToColor();
minuteToColor();
hourToColor();
showColor();
