/*
Synth object. Has a number of oscillators and envelopes etc.
OCTSHFT constant sets oscillators to play +- a number of octaves. 
example: set to -1 to play one octave lower 
*/
class Synth{
  constructor(){
    //console.log("a synth is being built\n");
    this.OCTSHIFT = 0;
    this.voices = [
      (new p5.SinOsc()),
      (new p5.SinOsc()),
      (new p5.SinOsc())
    ]; 

    this.envelopes = [
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
    
    this.stop(); //in case this cell is already playing
    
    this.voices.map(v => v.start());//start the oscilators
    
    this.envelopes.map(e => e.setRange( (this.MAXAMP) , 0)); //highest and lowest volumes
    this.envelopes.map(e => e.setADSR(0.2, 0.2, 0.3, 1));
    
    for(let i = 0; i < this.voices.length; i++)
      this.voices[i].amp(this.envelopes[i]);

    this.voices[0].freq(midiToFreq(root + this.OCTSHIFT*12));
    this.voices[1].freq(midiToFreq(third + this.OCTSHIFT*12));
    this.voices[2].freq(midiToFreq(fifth + this.OCTSHIFT*12));
    
    for(let i = 0; i < this.envelopes.length; i++)
      this.envelopes[i].play(this.voices[i]);
  }
  
  stop(){
    this.voices.map(v => v.amp(0, 1));
    //this.voices.map(v => v.stop());
  }
}