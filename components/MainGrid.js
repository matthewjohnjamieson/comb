/*
VF
Not sure if this class is entirely necessary 
or if we could put the funtionality into main.
Hence why I put "isThisVarNeeded" as an argument 
in main
VF
*/

//pretty much only needed as a singleton if we want to implement checks for that
//or, as stated in the block comment, we might not need this class but i figured I'd
//try to separate out my logic VF
class MainGrid{
  constructor(){
    this.circleOfFifthsKeys = ['F#','C#','G#','D#','A#','F','F#','B','E','A','D','G']; //first half is for the 'flat' keys and second half is for the others
    this.colorWheel = ['RED','GREEN','BLUE'];
    this.reverseColorWheel = ['RED','BLUE','GREEN'];
  }
  
  buildMainGrid(){
    var tempArray = [(new CellGrid(width/2,height/2,30,'C','RED'))];
    for(var i = 1; i <= 6; i++){
      tempArray.push(new CellGrid(width/2 + (36*3*i),height/2,30,this.circleOfFifthsKeys.pop(),this.colorWheel[i%3]));
    }
    for(var i = 1; i <= 6; i++){
      tempArray.push(new CellGrid(width/2 - (36*3*i),height/2,30,this.circleOfFifthsKeys.pop(),this.reverseColorWheel[i%3]));
    }
    return tempArray;
  }
}
