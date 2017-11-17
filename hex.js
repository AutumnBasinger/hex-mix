var tube = [[255,0,255], [255,255,0], [0,255,255]]
var pallete = [undefined, undefined, undefined]
var canvas = [undefined, undefined, undefined]

function makeTube(name, value){
  var name = document.getElementById(string(name));
  var value = value
}

function update(tile, clear){
  if (clear) {
    tile.style.backgroundColor = undefined;
  } else {
    tile.value = "new value"
    tile.style.backgroundColor = "rgb(" + "new value" + ")";
  };
};

function getColor(tile){
  //return tile.value
}

function drag(t1, t2){
  //getColor(t1)
  //getColor(t2)
  //anything + tube = error()
  //anything + pallete = calculate()
  //anything + canvas = arrange()
}

function error(){
  //display eror
}

function calculate(){
  //calculate and display color
  //var mixNew = []
  //mixNew.push(Math.round((mv1[0]+mv2[0])/n));
  //mixNew.push(Math.round((mv1[1]+mv2[1])/n));
  //mixNew.push(Math.round((mv1[2]+mv2[2])/n));
}

function arrange(){
  //update arrangement
}

var m = document.getElementById("m");
var y = document.getElementById("y");
var c = document.getElementById("c");
var p1 = document.getElementById("p1");
var p2 = document.getElementById("p2");
var p3 = document.getElementById("p3");
var c1 = document.getElementById("c1");
var c2 = document.getElementById("c2");
var c3 = document.getElementById("c3");
