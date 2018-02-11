//in lew of static js class variables (until/if we figure those out)
//this variable keeps count of the # of Clickable instances
//used as an id number and map color
let clickableCount = 0;

//base class for anything displayable.
class Displayable{
  
  //the display map is the version of the shape drawn under the
  //user displayable layer. It's for event detection of mouse rollovers
  //it's in the Displayable class because many displayable objects may not
  //be clickable themselves, but be made up of clickable objects. this method
  //should be used to call the clickable objects displayMap() method. 
  //a good example can be found in the CombCellGrid class.
  displayMap(){ 
  }
  
  display(){
  }
}

//base class for anything clickable 
class Clickable extends Displayable{
  constructor(){
    super();
    clickableCount+=1;
    this.clickID = clickableCount;
    this.clickMapColor = this.clickID;  
  }
}