/*
a chord object containing data about which notes are to be played
root: root note of chord
qual: "quality of chord" eg: maj/min/dim etc
synth: Synth object which will actually play the notes
*/ 

//used by chord to look up midi values
let octave = {
  'C':60,'C#':61,'D':62,'D#':63,'E':64,'F':65,'F#':66,'G':67,'G#':68,'A':69,'A#':70,'B':71};

class Chord{
  constructor(root,qual,synth){
    this.root = root;
    this.rootMidiNote = octave[root];
    this.qual = (qual === null ? '' : qual);
    
    //dim logic  
    if(this.qual === "m" || this.qual === "dim"){
      this.third = this.rootMidiNote + 3;
    }
    else{
      this.third = this.rootMidiNote + 4;
    }

    this.fifth = (this.qual === "dim" ? this.rootMidiNote + 6 : this.rootMidiNote + 7);
    this.synth = synth;     
  }
  
  play(){
    this.synth.play(this.rootMidiNote,this.third,this.fifth);
  }

  stop(){
    this.synth.stop();
  }
}