//p5.disableFriendlyErrors = true; //suppresses errors when you overwrite a p5.js function. probably just leave it commented out 

/*
main for Comb project.
*/


/***  processing functions ***/

let mouseWasClicked = false; //event switch
let currentScreen = 0;
let screens = [];
let map;

function setup() {
  pixelDensity(1); // set pix density for high dens displays

  frameRate(60); //changed from 30
  createCanvas(windowWidth, windowHeight); //changed added windowWidth, windowHeight insted of 
//  colorMode(HSB, 255);
  var mainGrid = new MainGrid();
  var isThisVarNeeded = mainGrid.buildMainGrid();
  screens[0] = new Screen(128, isThisVarNeeded); //main grid
  //screens[1] = new Screen(128, [(new Cell(width/2,height/2,100,255,255,(new Chord("D", "min", "7"))))]); //playin' around screen
  
  screens[(screens[1] ? 1 : 0)].displayMap();
  loadPixels(); //load the display into the pixel buffer
}

function draw() {
  //background(0, 100, 200); may ot maynot be needed
  screens[(screens[1] ? 1 : 0)].display();
}

function windowResized() { // added new just for resize
  resizeCanvas(windowWidth, windowHeight);
  screens[(screens[1] ? 1 : 0)].displayMap();
  loadPixels(); //load the display into the pixel buffer
}

function mouseClicked(){
  mouseWasClicked = true;
}

/*** ^ processing functions ^ ***/

//https://p5js.org/reference/#/p5.Image/pixels
function colorUnderMouse(){
  let x,y,d;
  let off, components;
  x = mouseX;
  y = mouseY;
  d = 1; //depreciated: pixelDensity(); should now always be 1
  off = (y * width + x) * d * 4;
  components = [
    pixels[off],
    pixels[off + 1],
    pixels[off + 2],
    pixels[off + 3]
  ];

  return components;
}