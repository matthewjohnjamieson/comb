/*
Synth object will play the notes. global and persistant so that all chords can share the synth

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

    //total amplitude can't excede 1.0, this constant divides 1 by the num of 
    //voices in the synth, so that they don't add up > 1
    this.MAXAMP = 1/this.voices.length;

    this.voices.map(v => v.amp(0)); //init amplitude
    this.voices.map(v => v.start());//start the oscilators
  }

  play(root,third,fifth){ 

    this.envelope.map(e => e.setADSR(0.01, 0.5, 0.1, 0.7));
    this.envelope.map(e => e.setRange( (this.MAXAMP) , 0)); //highest and lowest volumes
    

    this.voices[0].amp(this.envelope[0]);
    this.voices[1].amp(this.envelope[1]);
    this.voices[2].amp(this.envelope[2]);

    this.voices[0].freq(midiToFreq(root));
    this.voices[1].freq(midiToFreq(third));
    this.voices[2].freq(midiToFreq(fifth));
        
    this.envelope[0].play(this.voices[0]);
    this.envelope[1].play(this.voices[1]);
    this.envelope[2].play(this.voices[2]);
    }
  
  stop(){
    this.voices.map(v => v.amp(0));
  }
}