//initial default inventory
var inventory = {
  red: [225, 0, 0],
  green: [0, 255, 0],
  blue: [0, 0, 255],
  white: [255, 255, 255],
  black: [0, 0, 0]
};

var viewBox = document.getElementById("viewBox"); //color output
var messageBox = document.getElementById("messageBox"); //message output
var viewInput = document.getElementById("viewInput"); //color input string
var dev = document.getElementById("dev"); //debug message
var currentColor;

function viewNum(){
  if (viewInput.value in inventory) { //color stringname
    currentColor = inventory[viewInput.value]; //rgb array
    viewBox.style.backgroundColor = "rgb(" + currentColor + ")";
    viewBox.innerHTML = "String here so color shows, fix later"
    messageBox.innerHTML = "You're looking at the color " + currentColor;
    dev.innerHTML = "Dev: currentColor variable = " + currentColor;
  } else {
    messageBox.innerHTML = "You don't have that color yet";
  }
}

var mi1 = document.getElementById("mi1"); //string
var mi2 = document.getElementById("mi2"); //string

function mixNum(){
  if (mi1.value in inventory && mi2.value in inventory) { //color stringnames
    var mixNew = []
    var mv1 = inventory[mi1.value]; //turns string to rgb array
    var mv2 = inventory[mi2.value];
    var n = 1; //try add then overflow
    mixNew.push(Math.round((mv1[0]+mv2[0])/n));
    mixNew.push(Math.round((mv1[1]+mv2[1])/n));
    mixNew.push(Math.round((mv1[2]+mv2[2])/n));
    currentColor = mixNew;
    messageBox.innerHTML = "You just mixed the color: " + currentColor; //rgb array
    viewBox.style.backgroundColor = "rgb(" + currentColor + ")";
    viewBox.innerHTML = "String here so color shows, fix later";
    dev.innerHTML = "Dev: currentColor variable = " + currentColor;
  } else {
    messageBox.innerHTML = "You don't have at least one of those colors yet"
  }
}

var nameInput = document.getElementById("nameInput");
var inventoryBox = document.getElementById("inventoryBox");

function isCurrentColor(color){
  return arrEquals(color, currentColor);
}

//checks if currentColor (color shown) in colors list
function valueInInventory() {
  return Object.values(inventory).some(isCurrentColor);
}

function saveName(){
  if (currentColor === undefined) {
    messageBox.innerHTML = "You need to mix a color first";
  } else if (nameInput.value in inventory) {
    messageBox.innerHTML = "You already have a color named " + nameInput.value + " in your inventory";
  } else if (valueInInventory()) {
    messageBox.innerHTML = "Do you want to change this color's name to " + nameInput.value + " ?";
  } else {
    inventory[nameInput.value] = currentColor;
    messageBox.innerHTML = "You just added the color " + nameInput.value + " to your inventory!";
    inventoryBox.innerHTML = Object.keys(inventory);
  }
}

function arrEquals(a, b){
  return a.length === b.length && a.every((el, i) => el === b[i]);
}
