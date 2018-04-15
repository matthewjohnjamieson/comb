
/*
collection of cells into a grid.
The central lower cluster cell is the initial draw point for the grid.


DEPENDS ON: CombCell.js
*/

class CellGrid extends Displayable{
  constructor(x,y,cellSize,key,keyDisplayColor){
    super();
    this.x = x;//x and y positions of the center (V chord) cell
    this.y = y;
    this.SPACING = 1.77; //space between cells in grid
    this.key = key;
    this.cellSize = cellSize;
    this.keyDisplayColor = keyDisplayColor; // plug in hue value?
    this.cells = this.makeCells();
  }
  
  //builds a grid of displayable cells starting from the middle of the grid
  makeCells(startX, startY){
    let tempArray = []; //stored array of new cells   

    //these variables are used to assign chords to cells based on key
    let keys = ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'];
    let keyIndex = keys.findIndex(x => x == this.key);//search keys array for index of grid key
    let offsets = [11,2,5,4,9,0,11,7];//intervals in reverse order (so that pop() can be used)
    let quals   = ['dim','m','','m','m','','dim','']; //empties represent major chords 
    
    //nested function to generate a Cell object, complete with a chord from the grid's key.
    //a nested function used in this way can't automatically access "this" for class elements.
    //to bring the class into scope, it must be passed a reference to "this" explicitly.
    //"this" is a reserved keyword, so we need some other name. Here "thisObject" is the name
    //for that reference. The point is: calling this function requires the first argument to
    //be: "this"
    function buildCell(thisObject,cellX,cellY){
      return new Cell(
                  cellX,
                  cellY,
                  thisObject.cellSize,
                  thisObject.keyDisplayColor, //change display color here? probably need array or class to have different colors
                  null,
                  new Chord(keys[(keyIndex + offsets.pop()) % keys.length], //assign a chord to the cell
                                       quals.pop(),
                                       new Synth()));
    }

    
    /* below is the code to generate the grid from cells... */
    /* INVOLVES TRIG, so edit at your own risk. */
    
    tempArray.push(buildCell(this,0,0)); //center cell
    //lower cluster. fancy fractions are for the internal trig junk
    for(var i = 4/3; i <= 7/3; i += 1/3){
      tempArray.push(buildCell(
        this,
        (this.SPACING*this.cellSize)*Math.cos( -(i) * PI),
        (this.SPACING*this.cellSize)*Math.sin( -(i) * PI)));
    } 
    //"translate" variables for upper cluster by adding these variables to the coords
    let transX = (this.SPACING*this.cellSize)*Math.cos(5/3 * PI);
    let transY = (this.SPACING*this.cellSize)*Math.sin(5/3 * PI);  
    //upper cluster. fancy fractions are for the internal trig junk    
    for(var i = 1; i > 1/3; i -= 1/3){ 
      tempArray.push(buildCell(
        this,
        (this.SPACING*this.cellSize)*Math.cos( -(i) * PI)+transX,
        (this.SPACING*this.cellSize)*Math.sin( -(i) * PI)+transY));
    }

    return tempArray;
  }

  //reset clicked status for all cells in a grid. called on mouseRelease
  resetisclicked(){
    this.cells.map(cell => cell.resetisclicked());
  }
  
  resetIsHighlighted(){
    this.cells.map(cell => cell.resetIsHighlighted());
  }

  //push() and pop() are needed here to return the draw point to default (or whatever it was before)
  displayMap(){
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
}
