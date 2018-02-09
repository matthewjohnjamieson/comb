/*
Synth object will play the notes. global and persistant so that all chords can share the synth
currently set up with only 3 voices for simplicity
future: add an amp envelope, this will need a gui at some point to edit it's attributes
(another screen for this) 
*/
class Synth{
  constructor(){
    this.voices = [
      (new p5.SinOsc()),
      (new p5.SinOsc()),
      (new p5.SinOsc())
    ]; 
  }

  play(root,third,fifth){ 
    this.voices[0].freq(midiToFreq(root));
    this.voices[1].freq(midiToFreq(third));
    this.voices[2].freq(midiToFreq(fifth));
    
    this.voices.map(v => v.start())
  }

  stop(){
    this.voices.map(v => v.stop());
  }
}
