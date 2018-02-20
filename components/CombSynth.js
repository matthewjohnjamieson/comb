/*
Synth object will play the notes. global and persistant so that all chords can share the synth
currently set up with only 3 voices for simplicity
future: add an amp envelope, this will need a gui at some point to edit it's attributes
(another screen for this) 
*/
class Synth{
  constructor(){
    this.voices = [
      (new p5.Oscillator()),
      (new p5.Oscillator()),
      (new p5.Oscillator())
    ]; 

    this.voices[0].setType('sine');
    this.voices[1].setType('sine');
    this.voices[2].setType('sine');
  }

  play(root,third,fifth){ 

    this.voices.map(v => v.start());

    this.voices[0].amp(0.5);
    this.voices[1].amp(0.5);
    this.voices[2].amp(0.5);

    this.voices[0].freq(midiToFreq(root));
    this.voices[1].freq(midiToFreq(third));
    this.voices[2].freq(midiToFreq(fifth));

  
    }
  

  stop(){
    this.voices.map(v => v.stop());
  }
}