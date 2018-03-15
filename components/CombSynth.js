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

    this.envelope = [
      (new p5.Env()),
      (new p5.Env()),
      (new p5.Env())
    ];
  }

  play(root,third,fifth){ 

    //this.envelope = new p5.Env();
    //this.envelope.play(this.voices.map(v), 0, 0.1);
   // this.envelope.setADSR(0.001, 0.5, 0.1, 0.5) //(set attackTime, decayTime, sustainRatio, releaseTime)
    this.envelope.map(e => e.setADSR(0.001, 0.5, 0.1, 0.5));

   // this.envelope.setRange(1,0); //(set attackLevel, releaseLevel)
    this.envelope.map(e => e.setRange(1, 0));

    this.voices.map(v => v.start());

    // this.voices[0].amp(0.5, 4);
    // this.voices[1].amp(0.5, 4);
    // this.voices[2].amp(0.5, 4);
    this.voices.map(v => v.amp(0.5, 4));

    this.voices[0].freq(midiToFreq(root));
    this.voices[1].freq(midiToFreq(third));
    this.voices[2].freq(midiToFreq(fifth));
    
    this.envelope[0].play(this.voices[0], 0, 0.1);
    this.envelope[1].play(this.voices[1], 0, 0.1);
    this.envelope[2].play(this.voices[2], 0, 0.1);

  
    }
  

  stop(){
    this.voices.map(v => v.stop());
  }
}