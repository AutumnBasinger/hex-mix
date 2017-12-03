let color1;
let color2;
let newColor;

colorValues = [
  [255,0,0],
  [0,255,0],
  [0,0,255],
  [170,0,0],
  [0,170,0],
  [0,0,170],
  [85,0,0],
  [0,85,0],
  [0,0,85],
  [0,0,0]
];

function newColorToScreen(newColor){
  
}

operationsList = [
  (function add(color1, color2) {
    for (i = 0; i < 3; i++) {
      newColor.push(color1[i] + color2[i]);
    }
    return newColor;
  }),
  (function subtract(color1, color2) {
    for (i = 0; i < 3; i++) {
      newColor.push(color1[i] - color2[i]);
    }
    return newColor;
  })
];

symbolsList = [
  '+',
  '-'
]

function Color(value){
  this.value = value;
  this.div = document.createElement('div');
  this.div.className = 'color';
  this.div.style.backgroundColor = "rgb(" + this.value + ")";
  this.div.addEventListener('onclick', () => {
    color1 = this.value;
  });
}

function makeColors(){
  for (i = 0; i < colorValues.length; i++) {
    let newColor = new Color(colorValues[i]);
    colorButtons.append(newColor.div);
  }
}

function Operation(operation, symbol){
  this.div = document.createElement('div');
  this.div.className = 'operation';
  this.div.innerHTML = symbol
  this.div.addEventListener('onclick', () => {
    //listen for color2
  });
}

function makeOperations(){
  for (i = 0; i < operationsList.length; i++) {
    let newOperation = new Operation(operationsList[i], symbolsList[i]);
    operationButtons.append(newOperation.div);
  }
}

makeColors();
makeOperations();
