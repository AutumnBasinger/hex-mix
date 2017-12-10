let color1;
let color2;
let storedOperation;
let outputColor = [0,0,0];

let state = 0;
//0 - nothing
//1 - C1 stored
//2 - C1, operation stored
//3 - C1, operation, C2 stored

colorValues = [
  [255,0,0], //red
  [0,255,0], //green
  [0,0,255], //blue
  [170,0,0],
  [0,170,0],
  [0,0,170],
  [85,0,0],
  [0,85,0],
  [0,0,85],
  [0,0,0]
];

function output(outputColor){
  let screenOutput = document.getElementById('screenOutput');
  screenOutput.style.backgroundColor = "rgb(" + outputColor + ")";
}

function Color(value){
  this.value = value;
  this.div = document.createElement('div');
  this.div.className = 'color';
  this.div.style.backgroundColor = "rgb(" + this.value + ")";
  this.div.addEventListener('click', () => {
    output(this.value);
  });
}

function makeColors(){
  for (i = 0; i < colorValues.length; i++) {
    let color = new Color(colorValues[i]);
    colorButtons.append(color.div);
  }
}

function clear() {
  output([0,0,0]);
  state = 0;
}

function enter() {
  if (state === 2) {
    color2 = color1;
    //call storedOperation (calculates, updates )
    state = 1
  } else if (state === 3) {
    // call storedOperation
    state = 1;
  }
}

function add(){
  div = document.createElement('div');
  div.className = 'operation';
  div.innerHTML = 'add';
  div.addEventListener('click', () => {
    if (state === 0) {
      color1 = [0,0,0];
      storedOperation = add();
      state = 2;
    } else if (state === 1) {
      storedOperation = add();
      state = 2;
    } else if (state === 2) {
      storedOperation = add();
    } else if (state === 3) {
      outputColor = [];
      for (i = 0; i < 3; i++) {
        outputColor.push(color1[i] + color2[i]);
      }
      output(outputColor);
      color1 = outputColor;
      storedOperation = add();
      state = 2;
    }
  });
}

makeColors();
