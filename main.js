//p5.disableFriendlyErrors = true; //suppresses errors when you overwrite a p5.js function. probably just leave it commented out 

/*
main for Comb project.
*/

let currentScreen = 0;
let screens = [];
let map;
let historyy = new ChordHistory(); 
// history may possibly be a reserved key word https://www.w3schools.com/js/js_reserved.asp
let globalsynth = new Synth();

function setup() {
  pixelDensity(1); // set pix density for high dens displays
  frameRate(30); //changed from 30
  
  createCanvas(windowWidth, windowHeight); //changed added windowWidth, windowHeight insted of 
  //colorMode(HSB, 255);
  translate((width/2), (height/2));
  
  let mainGrid = new MainGrid();
  let isThisVarNeeded = mainGrid.buildMainGrid();
  screens[0] = new Screen(128, isThisVarNeeded); //main grid

  scale(0.87);
  screens[0].displayMap();
  loadPixels(); //load the display into the pixel buffer
  screens[0].display();
}

function draw() {
  if(mouseIsPressed){    
  translate((width/2), (height/2));

  scale(0.87);  

  screens[0].display();
  }
}

function windowResized() { // added new just for resize
  resizeCanvas(windowWidth, windowHeight);
  //scale(0.90);
  translate((width/2), (height/2));

  scale(0.87);

  screens[0].displayMap();
  loadPixels(); //load the display into the pixel buffer
  screens[0].display();

}

//this function is called every time the mouse is released
function mouseReleased(){
  screens[0].resetisclicked();// reset the event triggers on all cells.
  if(colortonumber(colorUnderMouse()) == colortonumber("GREY")){
    screens[0].resetIsHighlighted();
	historyy.clear();
  }

}
