//p5.disableFriendlyErrors = true; //suppresses errors when you overwrite a p5.js function. probably just leave it commented out 

/*
main for Comb project.
*/

let currentScreen = 0;
let screens = [];
let map;
let history = new ChordHistory();


function setup() {
  pixelDensity(1); // set pix density for high dens displays
  frameRate(30); //changed from 30
  createCanvas(windowWidth, windowHeight); //changed added windowWidth, windowHeight insted of 
  //colorMode(HSB, 255);
  let mainGrid = new MainGrid();
  let isThisVarNeeded = mainGrid.buildMainGrid();
  screens[0] = new Screen(128, isThisVarNeeded); //main grid
  
  screens[0].displayMap();
  loadPixels(); //load the display into the pixel buffer
  screens[0].display();
}

function draw() {
  if(mouseIsPressed){
    screens[0].display();
  }
}

function windowResized() { // added new just for resize
  resizeCanvas(windowWidth, windowHeight);
  screens[(screens[1] ? 1 : 0)].displayMap();
  loadPixels(); //load the display into the pixel buffer
}

//this function is called every time the mouse is released
function mouseReleased(){
  screens[0].resetisclicked();// reset the event triggers on all cells.
  if(colortonumber(colorUnderMouse()) == colortonumber("GREY")){
    screens[0].resetIsHighlighted();
  }

}
