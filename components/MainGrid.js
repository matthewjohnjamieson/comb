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
    this.circleOfFifthsKeys = ['F#','C#','G#','D#','A#','F','F#','B','E','A','D','G','F#','C#','G#','D#','A#','F','F#','B','E','A','D','G']; //first half is for the 'flat' keys and second half is for the others
    //this.colorWheel = ['rgb(250,255,65)','rgb(120,220,82)','rgb(144,230,192)']; //ygb
    this.colorWheel = ['#E8B63A','#7C3F03']; // change the % mod in buildMainGrid
	//this.colorWheel = ['RED','GREEN','BLUE'];
    //this.reverseColorWheel = ['RED','BLUE','GREEN']; //rbg
	this.blackYellowWheel = ['BLACK','YELLOW']; // change the % mod in buildMainGrid
	//yellow = '#E8B63A'
	//brown = '#7C3F03'
	this.grids = [];
  }
  
  buildMainGrid(){
    this.grids.push((new CellGrid(0,0,30,'C','#E8B63A',false)));
    for(var i = 1; i <= 6; i++){
      this.grids.push(new CellGrid(0 + (106*i),0,30,this.circleOfFifthsKeys.pop(),this.colorWheel[i%2],false));
    }
    for(var i = 1; i <= 6; i++){
      this.grids.push(new CellGrid(0 - (106*i),0,30,this.circleOfFifthsKeys.pop(),this.colorWheel[i%2],false));
    }
	
	this.grids.push((new CellGrid(0,200,30,'C','BLACK',true)));
    for(var i = 1; i <= 6; i++){
      this.grids.push(new CellGrid(0 + (106*i),200,30,this.circleOfFifthsKeys.pop(),this.blackYellowWheel[i%2],true));
    }
    for(var i = 1; i <= 6; i++){
      this.grids.push(new CellGrid(0 - (106*i),200,30,this.circleOfFifthsKeys.pop(),this.blackYellowWheel[i%2],true));
    }
    return this.grids;
  }
}
