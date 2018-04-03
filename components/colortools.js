//convert a 32 bit number into a color
function numbertocolor(n){
  let mask = 0xFF;
  let c = color(((n>>>24) & mask), //red
                ((n>>>16)  & mask), //green
                ((n>>>8)  & mask), //blue
                ((n<<8)))          //alpha
  return c;
}

//convert a p5 color into a 32 bit number
function colortonumber(c){
  let n = alpha(c) | red(c)<<24 | green(c)<<16 | blue(c)<<8;
  return n;
}

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

  return color(components);
}