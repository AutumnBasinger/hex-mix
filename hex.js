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

let colorScreen1 = document.getElementById('colorScreen1');
let operationScreen = document.getElementById('operationScreen');
let colorScreen2 = document.getElementById('colorScreen2');
let equalScreen = document.getElementById('equalScreen')
let colorScreenBig = document.getElementById('colorScreenBig');

function output(outputColor, screenDiv){
  screenDiv.style.backgroundColor = "rgb(" + outputColor + ")";
  screenDiv.innerHTML = String(outputColor);
}

function Color(value){
  this.value = value;
  this.div = document.createElement('div');
  this.div.className = 'color';
  this.div.style.backgroundColor = "rgb(" + this.value + ")";
  this.div.addEventListener('click', () => {
    if (state === 0) {
      color1 = this.value;
      output(color1, colorScreen1);
      state = 1;
    } else if (state === 1) {
      color1 = this.value;
      output(color1, colorScreen1);
    } else if (state === 2) {
      color2 = this.value;
      output(color2, colorScreen2);
      state = 3;
    } else if (state === 3) {
      color2 = this.value;
      output(color2, colorScreen2);
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
  output([0,0,0], colorScreenBig);
  output([0,0,0], colorScreen1);
  output([0,0,0], colorScreen2);
  operationScreen.innerHTML = '';
  equalScreen.innerHTML = '';
}

function enter() {
  if (state === 2) {
    color2 = color1;
    storedOperation();
  } else if (state === 3) {
    storedOperation();
  }
}

function Operation(operationObject, symbol){
  this.div = document.createElement('div');
  this.div.className = 'operation';
  this.div.innerHTML = symbol;
  this.div.addEventListener('click', () => {
    if (operationObject === clear) {
      operationObject();
      state = 0;
    } else if (operationObject === enter) {
      operationObject();
      equalScreen.innerHTML = symbol;
      state = 1;
    } else if (state === 0) {
      color1 = [0,0,0];
      storedOperation = operationObject;
      state = 2;
      operationScreen.innerHTML = symbol;
    } else if (state === 1) {
      storedOperation = operationObject;
      state = 2;
      operationScreen.innerHTML = symbol;
    } else if (state === 2) {
      storedOperation = operationObject;
      operationScreen.innerHTML = symbol;
    } else if (state === 3) {
      operationScreen.innerHTML = symbol;
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
    let operation = new Operation(operationsList[i], symbolsList[i]);
    operations.append(operation.div);
  }
}

function add() {
  outputColor = [];
  for (i = 0; i < 3; i++) {
    outputColor.push(color1[i] + color2[i]);
  }
  output(outputColor, colorScreenBig);
}

function subtract() {
  outputColor = [];
  for (i = 0; i < 3; i++) {
    outputColor.push(color1[i] - color2[i]);
  }
  output(outputColor, colorScreenBig);
}

function divide() {
  outputColor = [];
  for (i = 0; i < 3; i++) {
    outputColor.push(color1[i] / color2[i]);
  }
  output(outputColor, colorScreenBig);
}

function multiply() {
  outputColor = [];
  for (i = 0; i < 3; i++) {
    outputColor.push(color1[i] * color2[i]);
  }
  output(outputColor, colorScreenBig);
}

operationsList = [
  clear,
  divide,
  multiply,
  subtract,
  add,
  enter
]

symbolsList = [
  'C', //clear
  '÷', //divide
  '×', //multiply
  '−', //subtract
  '+', //add
  '=', //enter
]

makeColors(reds, red);
makeColors(blues, blue);
makeColors(greens, green);
makeOperations();
output(outputColor, colorScreenBig);
output(color1, colorScreen1);
output(color2, colorScreen2);
