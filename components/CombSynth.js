/*
Synth object. Has a number of oscillators and envelopes etc.
OCTSHFT constant sets oscillators to play +- a number of octaves. 
example: set to -1 to play one octave lower 
*/
class Synth{
  constructor(){
    this.OCTSHIFT = -1; // use to change octave
    this.voices = [
      (new p5.TriOsc()),
      (new p5.TriOsc()),
      (new p5.TriOsc())
    ]; 

    this.envelope = [
      (new p5.Env()),
      (new p5.Env()),
      (new p5.Env())
    ];

    //total amplitude can't excede 1.0, this constant divides 1 by the num of 
    //voices in the synth, so that they don't add up > 1
    this.MAXAMP = (1/this.voices.length) - 0.2;

    this.voices.map(v => v.amp(0)); //init amplitude
    //this.voices.map(v => v.start());//start the oscilators
  }

  play(root,third,fifth){

    this.voices.map(v => v.start());//start the oscilators

    this.envelope.map(e => e.setADSR(0.2, 0.2, 0.3, 1));
    this.envelope.map(e => e.setRange( (this.MAXAMP) , 0)); //highest and lowest volumes
    
    this.voices[0].amp(this.envelope[0]);
    this.voices[1].amp(this.envelope[1]);
    this.voices[2].amp(this.envelope[2]);

    this.voices[0].freq(midiToFreq(root + this.OCTSHIFT*12) );
    this.voices[1].freq(midiToFreq(third + this.OCTSHIFT*12) );
    this.voices[2].freq(midiToFreq(fifth + this.OCTSHIFT*12) );
        
    this.envelope[0].play(this.voices[0]);
    this.envelope[1].play(this.voices[1]);
    this.envelope[2].play(this.voices[2]);

    }
  
  stop(){
    this.voices.map(v => v.amp(0));
    this.voices.map(v => v.stop());
  }
}