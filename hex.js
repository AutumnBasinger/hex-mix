let firstColor;
let secondColor;

function Tile(type, value){
  this.type = type;
  this.value = value;
  this.div = document.createElement('div');
  this.div.className = 'tile';

  this.update = function(){
    this.div.style.backgroundColor = "rgb(" + this.value + ")";
  };
  this.update();

  this.div.addEventListener('dragstart', (event) => event.preventDefault());
  this.div.addEventListener('mousedown', () => firstColor = value);
  this.div.addEventListener('mouseup', () => {
    secondColor = value;
    if (type === 'tube') {
      //error message
    } else if (type === 'palette') {
      if (secondColor === undefined) {
        this.value = firstColor;
        this.update();
      } else {
        //calculate
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

makeTube([255,0,255])
makeTube([255,255,0])
makeTube([0,255,255])

makePalette()
makeCanvas()


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
