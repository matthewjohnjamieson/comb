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
		this.chordArray.push(new Chord(root,qual,synth));
		console.log(this.chordArray);
		console.log(this.chordArray.length);
	}

	search(chord) {
		for(let i = 0; i < this.chordArray.length; i++) {
			if (this.chordArray == chord) {
				return true; //returns true if chord is found
			}
		}
		return false; //returnd false if chord can not be found
	}

	remove(chord) {
		for(let i = 0; i < this.chordArray.length; i++) {
			if (this.chordArray == chord) {
				let removed = this.chordArray.splice(i,1);
				if(this.removed.length == 0) {
					return false; //returns false if chord found but not removed
				}
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