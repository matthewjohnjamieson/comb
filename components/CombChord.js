//used by chord to look up midi values
let octave = {
  'C':60,'C#':61,'D':62,'D#':63,'E':64,'F':65,'F#':66,'G':67,'G#':68,'A':69,'A#':70,'B':71};

/*
a chord object containing data about which notes are to be played
root: root note of chord
qual: "quality of chord" eg: maj/min/dim etc
synth: Synth object which will actually play the notes

future: more qualitys, extensions, various methods. This class is intended to be part of the
Cell model class.  
*/ 
class Chord{
  constructor(root,qual,synth){
    this.root = root;
    this.rootMidiNote = octave[root];
    this.qual = (qual == null ? '' : qual);
    this.third = (this.qual == "m" ? this.rootMidiNote + 3 : this.root + 4);
    this.fifth = this.root + 7;
    this.synth = synth;    
  }
  
  play(){
    this.synth.play(this.root,this.third,this.fifth);
  }

  stop(){
    this.synth.stop();
  }
}