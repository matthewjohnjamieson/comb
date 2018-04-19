/*
Class for to store a history of chord progressions created
Stores the progression in an array
stores the array of chord progression in global array
*/

class ChordHistory {
	constructor() {
		this.chordArray = [];
		let myJson = {"chords":this.chordArray};
		let newJson = null;
	}

	addElement(root,qual,synth) {
		let temp = new Chord(root,qual,synth);



		if(this.search(temp) === true)
			console.log( this.remove(temp));

		this.chordArray.unshift(new Chord(root,qual,synth));
		
		console.log(this.chordArray);
		console.log(this.chordArray.length);
	}

	search(chord) {
		for(let i = 0; i < this.chordArray.length; i++) {
			if (this.chordArray[i].root === chord.root && this.chordArray[i].qual === chord.qual) {
				//console.log('history.search() passed')
				return true; //returns true if chord is found
			}
		}
		//console.log('history.search() failed')
		return false; //returnd false if chord can not be found
	}

	remove(chord) {
		for(let i = 0; i < this.chordArray.length; i++) {
			
			if (this.chordArray[i].root === chord.root && this.chordArray[i].qual === chord.qual) {
				let removed = this.chordArray.splice(i,1);
				console.log("removed: ", removed);				
				//if(this.removed.length == 0) {
				//	return false; //returns false if chord found but not removed
				//}
				return true;  //returns true is chord removed
			}
		}
		return false; //returns false if chord not found
	}

	save() {
		saveJSON(this.myJson,comb.json);
	}

	load(newChords) {
		newJson = loadJson(newChords);
		let currentID = this.chordArray.length;

		//loads chords at the end of what has already be saved in chordArray
		for(let i = 0; i < this.newJson.chords.length; i++) {
			this.chordArray[currentID + i] = newJson.chords[i]; //Assumes it is in the same format it is saved in
		}
	}

	/*loadMidi() {
	
	}
	*/

	clear() {
		this.chordArray =  [];
	}
}