//p5.disableFriendlyErrors = true; //suppresses errors when you overwrite a p5.js function. probably just leave it commented out 

/*
main for Comb project.
*/

let currentScreen = 0;
let screens = [];
let map;

function setup() {
  pixelDensity(1); // set pix density for high dens displays
  frameRate(30); //changed from 15
  //createCanvas(windowWidth, windowHeight); //changed added windowWidth, windowHeight insted of 
  var cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('display', 'block');
  //colorMode(HSB, 255);
  let mainGrid = new MainGrid();
  let isThisVarNeeded = mainGrid.buildMainGrid();
  screens[0] = new Screen(128, isThisVarNeeded); //main grid
  
  screens[0].displayMap();
  loadPixels(); //load the display into the pixel buffer
}

function draw() {
  screens[0].display();
}

function windowResized() { // added new just for resize
  resizeCanvas(windowWidth, windowHeight);
  screens[(screens[1] ? 1 : 0)].displayMap();
  loadPixels(); //load the display into the pixel buffer
}
