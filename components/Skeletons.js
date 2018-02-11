//in lew of static js class variables (until/if we figure those out)
//this variable keeps count of the # of Clickable instances
//used as an id number and   
let clickableCount = 0;

//base class for anything displayable.
class Displayable{
  display(){
  }
}

//base class for anything clickable 
class Clickable extends Displayable{
  constructor(){
    super();
    clickableCount++;
    this.clickID = clickableCount;
    this.mapColor = this.clickID;  
  }
  //the display map is the version of the shape drawn under the
  //user displayable layer. It's for event detection of mouse rollovers
  displayMap(){
  }
}