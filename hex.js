let firstColor;
let secondColor;

let message = document.getElementById('message')

function Tile(type, value){
  this.type = type;
  this.value = value;
  this.div = document.createElement('div');
  this.div.className = 'tile';

  this.update = function(){
    this.div.style.backgroundColor = "rgb(" + this.value + ")";
  }
  this.update();

  this.div.addEventListener('dragstart', (event) => event.preventDefault());
  this.div.addEventListener('mousedown', () => firstColor = value);
  this.div.addEventListener('mouseup', () => {
    secondColor = this.value;
    if (type === 'tube') {
      message.innerHTML = "Don't contaminate your tube!"
    } else if (type === 'palette') {
      if (secondColor === undefined) {
        this.value = firstColor;
        this.update();
      } else {
        let newColor = [];
        newColor.push(Math.round((firstColor[0]+secondColor[0])/2));
        newColor.push(Math.round((firstColor[1]+secondColor[1])/2));
        newColor.push(Math.round((firstColor[2]+secondColor[2])/2));
        this.value = newColor;
        this.update();
      }
    }
  });
}

function makeTube(value) {
  let newTube = new Tile('tube', value);
  tube.append(newTube.div);
}

function makePalette() {
  let newPalette = new Tile('palette');
  palette.append(newPalette.div);
}

function makeCanvas() {
  let newCanvas = new Tile('canvas');
  canvas.append(newCanvas.div);
}

tubes = [
  [255,0,255],
  [255,255,0],
  [0,255,255]
];

function makeTiles(tubes, numP, numC) {
  for (i = 0; i < tubes.length; i++) {
    makeTube(tubes[i]);
  }
  for (i = 0; i < numP; i++) {
    makePalette();
  }
  for (i = 0; i < numC; i++) {
    makeCanvas();
  }
}

makeTiles(tubes, 3, 3);


//add click hold event listeners to all tiles
//mouse down and mouse up for every tile, in tile constructor
//global current color
//on click hold event:
  //start listening for drop event
  //show small colored square at mouse
  //get tile.type and tile.value
//on drop event:
  //get tile.type and tile.value
  //if dropped on tube:
    //error message
  //if dropped on pallete:
    //caluclate tile1.value and tile2.value
    //update tile color
    //assign new value to tile
  //if dropped on canvas:
    //if undefined:
      //paste tile1.value on tile
    //else:
      //arrange HTML elements
