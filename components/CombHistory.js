/*
Class for to store a history of chord progressions created
Stores the progression in an array
stores the array of chord progression in global array
*/



class ChordHistory {
	constructor() {
		this.chordArray = [];
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
		console.log('history.search() failed')
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

	}

	load() {

	}

	/*loadMidi() {
	
	}
	*/

	clear() {
		this.chordArray =  [];
	}
}