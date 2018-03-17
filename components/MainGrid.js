/*
collection of cells into a grid.
The central lower cluster cell is the initial draw point for the grid.

CAN:
-display a grid of cells to represent a key
-assign chords to cells (currently just strings rather than actual chord objects)
-be a good citizen: returns the draw point to it's position before the grid is drawn 

DEPENDS ON: CombCell.js
*/

class MainGrid{
  constructor(){
    //super();
    //this.x = x;//x and y positions of the center (V chord) cell
    //this.y = y;
    //this.SPACING = 1.77; //space between cells in grid
    //this.key = key;
    //this.cellSize = cellSize;
    //this.cells = this.makeCells();
//	this.gridArray = [(new CellGrid(width/2,height/2,30,'C'))];
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
  
/*   someFunction(){
	  for(var i = 1; i <= 6; i++){
		  this.gridArray.push(new CellGrid(width/2 + (36*3*i) ,height/2,30,circleOfFifthsKeys.pop());
	  }
  } */

  //push() and pop() are needed here to return the draw point to default (or whatever it was before)
/*   displayMap(){
    push();
    translate(this.x,this.y);//put the grid where it's at
    this.cells.map(cell => cell.displayMap());
    pop();
  }

  //push() and pop() are needed here to return the draw point to default (or whatever it was before) 
  display(){
    push(); // saves the current draw point
    
    translate(this.x,this.y);//put the grid where it's at
    //rotate(-PI/6);
    this.cells.map(cell => cell.display());

    pop(); // returns the draw point to when it was saved.
  }
} */
