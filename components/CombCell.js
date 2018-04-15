
/*
Class for Comb hex cells

HOW MOUSEOVER DETECTION WORKS:
this class detects mouseovers with a "map" color on each shape, which is displayed before the
user viewable display color. This color is checked against the color under the mouse when the 
mouse is pressed (mouseIsPressed boolean check). Each Clickable shape displays with a different map color
that serves as an identifier.

Each cell is structured as a model-view-controller set of classes, inside a wrapper class (found at the bottom of this file)

FUTURE PLAN: this class is way too big. Even though MVC classes divide up the labor effectivly, finding anything in this 
file is a bit of a mess. I'm considering breaking this into 4 seperate files. I'm 50-50 on if that will make life
easier or harder though -MJ
*/


//view: responsible for displayable tasks ie drawing to the canvas
//displayable tasks include user-viewable and non-user-viewable (mouseover map display)
class CellView extends Displayable{
  constructor(x,y,r,displayColor,mapCol,isInBottomGrid){
    super();
    this.x = x;//coords
    this.y = y;
    this.r = r;//radius
    this.cellText = '';//text to display in a cell
    this.mapColor = mapCol;//this is the hit map color to detect mouseover events
    this.displayColor = displayColor;//this is the color that the user sees. 
    this.tempDisplayColor = this.displayColor;
    this.SIDES = 6;

	this.isHighlighted = false;
	this.isInBottomGrid = isInBottomGrid;
	this.isOn = false;
	if(this.isInBottomGrid){
	  this.isOn = false;
	  console.log('button is not on');
	}
	else{
	  this.isOn = true;
	  console.log('button is on');
	}
	//this.isSecondGrid = false;
  }
  
  //https://p5js.org/examples/form-regular-polygon.html
  polygon(x, y, radius, npoints){
    var angle = TWO_PI / npoints;
    beginShape();
    for(var a = PI/6; a < TWO_PI; a += angle){
      var sx = x + Math.cos(a) * radius;
      var sy = y + Math.sin(a) * radius;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  } 

  //draw mouseover detection map layer
  displayMap(){
    noStroke(); //turns off outlines (borders can interfere with detection)
    fill( color(this.mapColor));
    push();
    // rotate(-PI/6); //match rotation with user viewable layer
    this.polygon(this.x,this.y,this.r,this.SIDES); 
    pop();
  }

  //draw user viewable layer
  //going to have to edit this function if we want gradient colors VF
  display(){
    /* if(this.isInBottomGrid){
      if(historyy.search())
      this.isOn = false;
      
    } */
    
    //stroke color logic
    if(this.isHighlighted){
      stroke('MAGENTA'); //turn outlines back on for hex display //white with text not outlined, saturated mag or purp, 
    }
    else if(this.tempDisplayColor == '#7C3F03'){ //if color is brown
      stroke('#E8B63A');//yellow border
    }
	else if(this.tempDisplayColor == '#E8B63A'){ //if color is yellow
      stroke('#7C3F03');//brown border
	}
	else if(this.isInBottomGrid && this.isOn){
      stroke('GREEN');
    }
	else{
      stroke(125);//background color
	}
    //stroke color logic
	
    //fill color logic
	if(this.isOn){
      fill(this.displayColor);
    }
	else{
      fill(125)//background color
    }
	//fill color logic
	
    push()
    // rotate(-PI/6); //hacky rotation stuff 
    this.polygon(this.x,this.y,this.r,this.SIDES);
    
	//text fill color logic
    if(this.tempDisplayColor == '#E8B63A'){ //if color is yellow
	  fill('#7C3F03'); //text fill color (brown)
	}
	else if(this.tempDisplayColor == '#7C3F03'){ //if color is brown
	  fill('#E8B63A'); //text fill color (yellow)
	}
    else if(this.isInBottomGrid && this.isOn){
      fill('BLACK');
    }
	else{
      fill(125);//background color
	  stroke(125);
    }
	//text fill color logic
	
    //stroke(defaulted to grey); //text outline color optional VF
    textFont('Verdana');
    textSize(this.r / 2.3); //text size is relative to the radius
    textAlign(CENTER);
    
    translate(this.x, this.y);
    // rotate(PI/6); //get the text rotated correctly
    text(this.cellText, 0, 0 + (this.r / 7));
    pop();
  }
}


//controller: monitors button for events and updates appropriately
//eg: when a button is pressed it must both notify the view to alter display
//and model to signal the audio engine
class CellController{
  constructor(v,m,id){
    this.cellView = v;
    this.cellModel = m;
    this.cellData = this.cellModel.data;
    this.cellView.cellText = this.cellModel.chord.root + this.cellModel.chord.qual;//text to display in a cell
    this.cellNumber = id;//cellNumber is a global variable to keep # of cells
    this.isClicked = false;
	  //need a temp variable to store the previous displayColor of the cell to go back to when click event occurs
	  this.tempDisplayColor = this.cellView.displayColor; 
    // numberOfCells++;
  }

  eventClickedMouseOver(){
    if(mouseIsPressed
        && (colortonumber(colorUnderMouse()) == colortonumber(this.cellView.mapColor)) 
        && (this.isClicked === false) && (this.cellView.isOn)){
    
      this.cellView.displayColor = 'BLACK';
      this.cellModel.chord.play();
	  if(!this.cellView.isInBottomGrid){
        historyy.addElement(this.cellModel.chord.root,this.cellModel.chord.qual, 
                              this.cellModel.chord.synth);
      }
      let bin = 0; 
      //console.log( color(this.cellView.mapColor) );
      // console.log( (red(this.cellView.mapColor)
      // + blue(this.cellView.mapColor)
      // + green(this.cellView.mapColor)));
      this.isClicked = true;
	  if(!this.cellView.isInBottomGrid){
        if(!this.cellView.isHighlighted){
          this.cellView.isHighlighted = true;
        }
      }
    }
    else if((colortonumber(colorUnderMouse()) != colortonumber(this.cellView.mapColor))
            ||(!mouseIsPressed && (this.isClicked === true))){ 
      
      this.cellView.displayColor = this.tempDisplayColor; //change to stored color
      this.cellModel.chord.stop();
      this.isClicked = false;
    }
    else if(mouseIsPressed
            && (colortonumber(colorUnderMouse()) == colortonumber(this.cellView.mapColor))
            && (this.isClicked === true)){
      //this.isClicked = false;
      //this.eventClickedMouseOver();  
    }
	
	if(this.cellView.isInBottomGrid){
      if(historyy.search(this.cellModel.chord)){
        this.isOn = true;
	  }
	  else{
        this.isOn = false;
	  }
    }
  }
}

//model: currently responsible for holding a chord object to interface the cell
//with the back end. Chords have letters, qualities, and currently hold synth objects.
//in the future, they will have to carry a reference to a global synth object. 
class CellModel{
  constructor(chord){
    this.chord = chord;
  }
}


//wrapper class for cell components
//functions as a public API object in order to hide MVC implimentation
class Cell extends Clickable{
  constructor(x,y,r,displayColor,mapCol,chord,isInBottomGrid){
    super();
    this.cellView = new CellView(x,y,r,displayColor,this.clickMapColor,isInBottomGrid);
    this.cellModel = new CellModel(chord);
    this.cellController = new CellController(this.cellView,this.cellModel,this.clickID);
  }

  resetisclicked(){
    this.cellController.isClicked = false;
  }
  
  resetIsHighlighted(){
    this.cellView.isHighlighted = false;
  }

  displayMap(){
    this.cellView.displayMap();//non-user-viewable mouseover detection layer
  }

  display(){
    this.cellController.eventClickedMouseOver();//controller event check
    this.cellView.display();//user-viewable
  }
}
