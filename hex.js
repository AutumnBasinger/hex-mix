function tile(type, value){
  this.type = type;
  this.value = value;
  this.get = function() {
    document.getElementById(string(tile));
  };
  this.update = function(clear){
    if (clear) {
      this.style.backgroundColor = undefined;
    } else {
      this.value = "rgb3";
      this.style.backgroundColor = "rgb(" + "rgb3" + ")";
    };
  };
};

function makeTube(name, value) {
  //var name = new tile(tube, value);
  //create HTML element with ID = name
}

function makePalleteAndCanvas(numPallete, numCanvas) {
  //for range numPallete
    //var numPallete[x] = new tile(pallete, undefined);
    //create HTML element with ID = numPallete[x];
  //for range numCanvas
    //var numCanvas[x] = new tile(canvas, undefined);
    //create HTML element with ID = numCanvas[x];
};

makeTube(m, [255,0,255]);
makeTube(y, [255,255,0]);
makeTube(c, [0,255,255]);
makePalleteAndCanvas(3, 3);

//add click hold event listeners to all tiles
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
