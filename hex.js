let color1 = [0,0,0];
let color2 = [0,0,0];
let storedOperation;
let outputColor = [0,0,0];

let state = 0;
//0 - nothing
//1 - C1 stored
//2 - C1, operation stored
//3 - C1, operation, C2 stored

reds = [
  [255,0,0],
  [204,0,0],
  [153,0,0],
  [102,0,0],
  [51,0,0],
  [0,0,0]
];

greens = [
  [0,255,0],
  [0,204,0],
  [0,153,0],
  [0,102,0],
  [0,51,0],
  [0,0,0]
];

blues = [
  [0,0,255],
  [0,0,204],
  [0,0,153],
  [0,0,102],
  [0,0,51],
  [0,0,0]
];

function output(outputColor){
  let screen = document.getElementById('screen');
  screen.style.backgroundColor = "rgb(" + outputColor + ")";
  screen.innerHTML = String(outputColor);
}

function Color(value){
  this.value = value;
  this.div = document.createElement('div');
  this.div.className = 'color';
  this.div.style.backgroundColor = "rgb(" + this.value + ")";
  this.div.addEventListener('click', () => {
    output(this.value);
    if (state === 0) {
      color1 = this.value;
      state = 1;
    } else if (state === 1) {
      color1 = this.value;
    } else if (state === 2) {
      color2 = this.value;
      state = 3;
    } else if (state === 3) {
      color2 = this.value;
    }
    console.log('state: ' + state + ', color: ' + this.value);
  });
}

function makeColors(list, div){
  for (i = 0; i < list.length; i++) {
    let color = new Color(list[i]);
    div.append(color.div);
  }
}

function clear() {
  output([0,0,0]);
}

function enter() {
  if (state === 2) {
    color2 = color1;
    storedOperation();
  } else if (state === 3) {
    storedOperation();
  }
}

function Operation(operationObject){
  this.div = document.createElement('div');
  this.div.className = 'operation';
  this.div.innerHTML = String(operationObject).substr(9,3);
  this.div.addEventListener('click', () => {
    if (operationObject === clear) {
      operationObject();
      state = 0;
    } else if (operationObject === enter) {
      operationObject();
      state = 1;
    } else if (state === 0) {
      color1 = [0,0,0];
      storedOperation = operationObject;
      state = 2;
    } else if (state === 1) {
      storedOperation = operationObject;
      state = 2;
    } else if (state === 2) {
      storedOperation = operationObject;
    } else if (state === 3) {
      operationObject();
      color1 = outputColor;
      storedOperation = operationObject;
      state = 2;
    }
    console.log('state: ' + state + ', operation: ' + this.div.innerHTML);
  });
}

function makeOperations() {
  for (i = 0; i < operationsList.length; i++) {
    let operation = new Operation(operationsList[i]);
    operations.append(operation.div);
  }
}

function add() {
  outputColor = [];
  for (i = 0; i < 3; i++) {
    outputColor.push(color1[i] + color2[i]);
  }
  output(outputColor);
}

function subtract() {
  outputColor = [];
  for (i = 0; i < 3; i++) {
    outputColor.push(color1[i] - color2[i]);
  }
  output(outputColor);
}

function divide() {
  outputColor = [];
  for (i = 0; i < 3; i++) {
    outputColor.push(color1[i] / color2[i]);
  }
  output(outputColor);
}

function multiply() {
  outputColor = [];
  for (i = 0; i < 3; i++) {
    outputColor.push(color1[i] * color2[i]);
  }
  output(outputColor);
}

operationsList = [
  clear,
  divide,
  multiply,
  subtract,
  add,
  enter
]

makeColors(reds, red);
makeColors(blues, blue);
makeColors(greens, green);
makeOperations();
output(outputColor);
