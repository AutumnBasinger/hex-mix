let set1 = [];
let set2 = [];
let currentSet = set1;

function Color(value){
  this.value = value;
  this.div = document.createElement('div');
  this.div.className = 'color';
  this.div.style.backgroundColor = "rgb(" + this.value + ")";
  this.div.addEventListener('onclick', () => {
    currentSet.push(this.value);
  });
}

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

function makeColors(colorValues) {
  for (i = 0; i < colorValues.length; i++) {
    let newColor = new Color(colorValues[i]);
    colorButtons.append(newColor.div);
  }
}

makeColors(colorValues);
