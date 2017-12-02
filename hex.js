let set1 = [];
let set2 = [];
let currentSet = set1;

function Color(value){
  this.value = value;
  this.div = document.createElement('div');
  this.div.className = 'color';
  this.div.addEventListener('onclick', () => {
    currentSet.push(this.value);
  });
}

function makeColor(value) {
  let newColor = new Color(value);
  colorButtons.append(newColor.div);
}

function makeColors(values) {
  for (i = 0; i < values.length; i++) {
    makeColor(values[i]);
  }
}

values = [
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

makeColors(values);
