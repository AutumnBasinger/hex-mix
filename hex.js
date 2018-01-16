let colorOutput = document.getElementById('colorOutput');

function main() {
  let time = new Date();
  hour = time.getHours();
  minute = time.getMinutes();
  second = time.getSeconds();

  red = Math.round(second * 4.26);
  green = Math.round((minute * 4.26) + (red/60));
  blue = Math.round((hour * 10.66) + (green/60));

  colorOutput.style.backgroundColor = "rgb(" + [red, green, blue] + ")";
}

main();

let timerID = setInterval(main, 1000);
