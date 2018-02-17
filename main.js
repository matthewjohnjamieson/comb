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
  pixelDensity(1);
  frameRate(30);
  createCanvas(1440,900);
  screens[0] = new Screen(128, [(new CellGrid(width/2,height/2,30,'C')), /*(new CellGrid(width/6,height/6,30,'D'))*/ ]); //main grid
  //screens[1] = new Screen(128, [(new Cell(width/2,height/2,100,255,255,(new Chord("D", "min", "7"))))]); //playin' around screen
  screens[(screens[1] ? 1 : 0)].displayMap();
  
  loadPixels(); //load the display into the pixel buffer
}

function draw() {
  screens[(screens[1] ? 1 : 0)].display();

  // DEBUGGING: display color under mouse when clicked 
  // if(mouseIsPressed){
  //   console.log(colorUnderMouse());
  // }
}

// function mouseClicked(){
//   mouseWasClicked = true;
// }

/*** ^ processing functions ^ ***/

//https://p5js.org/reference/#/p5.Image/pixels
function colorUnderMouse(){
  let x,y,d;
  let off, components;
  x = mouseX;
  y = mouseY;
  d = 1; //pixelDensity();
  off = (y * width + x) * d * 4;
  components = [
    pixels[off],
    pixels[off + 1],
    pixels[off + 2],
    pixels[off + 3]
  ];

  return components;
}