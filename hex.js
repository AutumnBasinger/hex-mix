//initial default inventory
var inventory = {};
inventory.red = [255, 0, 0];
inventory.green = [0, 255, 0];
inventory.blue = [0, 0, 255];
inventory.white = [255, 255, 255];
inventory.black = [0, 0, 0];

var viewBox = document.getElementById("viewBox"); //color output
var messageBox = document.getElementById("messageBox"); //message output
var viewInput = document.getElementById("viewInput"); //color input string
var dev = document.getElementById("dev"); //debug message
var currentColor;

function viewNum(){
  if (viewInput.value in inventory) { //stringname
    currentColor = inventory[viewInput.value];
    viewBox.style.backgroundColor = "rgb(" + currentColor + ")";
    viewBox.innerHTML = "test string" //must be here so color shows
    messageBox.innerHTML = "The color shown is: " + currentColor; //inventory.stringname outputs rgb array
    dev.innerHTML = "current color variable:" + currentColor;
  } else {
    messageBox.innerHTML = "You don't have that color yet";
  };
};

var mi1 = document.getElementById("mi1"); //string
var mi2 = document.getElementById("mi2"); //string

function mixNum(){
  if (mi1.value in inventory && mi2.value in inventory) { //color names
    var mixNew = []
    var mv1 = inventory[mi1.value]; //turns string to list [n, n, n]
    var mv2 = inventory[mi2.value];
    var n = 1; //add then overflow
    mixNew.push(Math.round((mv1[0]+mv2[0])/n));
    mixNew.push(Math.round((mv1[1]+mv2[1])/n));
    mixNew.push(Math.round((mv1[2]+mv2[2])/n));
    currentColor = mixNew;
    messageBox.innerHTML = "The new color is: " + currentColor; //list [n, n, n]
    viewBox.style.backgroundColor = "rgb(" + currentColor + ")"; //"rgb(" + mv1 + ")";
    viewBox.innerHTML = "test string"; //must be here so color shows
    dev.innerHTML = "current color variable: " + currentColor;
  } else {
    messageBox.innerHTML = "You don't have at least one of those colors yet"
  };
};

var nameInput = document.getElementById("nameInput");
var inventoryBox = document.getElementById("inventoryBox");

function saveName(){ //fix the object.values thing. find values in inventory
  dev.innerHTML = "ovi is: " + Object.values(inventory) + "and currentColor is: " + currentColor;
  if (currentColor === undefined) {
    messageBox.innerHTML = "You need to mix a color first";
  } else if (nameInput.value in inventory) {
    messageBox.innerHTML = "You already have a color named " + nameInput.value + " in your inventory";
  } else if (currentColor in Object.values(inventory)) {
    messageBox.innerHTML = "Current color in inventory.values() and its: " + currentColor
  };
};
