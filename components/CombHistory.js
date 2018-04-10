/*
Class for to store a history of chord progressions created
Stores the progression in an array
stores the array of chord progression in global array
*/



class ChordHistory{
	constructor(){
		this.chordArray = [];
	}

	addElement(root,qual,synth){
		this.chordArray.push(new Chord(root,qual,synth));
		console.log(this.chordArray);
	}

	search(chord){

	}

	remove(chord){
		
	}

	clear(){


	}
}