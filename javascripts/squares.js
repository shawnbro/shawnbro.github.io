// define synth and envelope
var synth = T("SynthDef").play();
synth.def = function(opts) {
  var square = opts.square
  var osc1, osc2, env;
  var a = Math.random() * 16000
  var d = Math.random() * 2800
  var s = Math.random() * 2800
  var r = Math.random() * 8000
  var timeOut = parseInt(a + d + s + r)
  setTimeout(function() {
    // opts.remove();
    opts.removeClass("active")
  }, timeOut);
  osc1 = T("sin", {freq:opts.freq, mul:Math.random()});
  osc2 = T("sin", {freq:opts.freq, mul:Math.random()});
  osc3 = T("sin", {freq:opts.freq * Math.random(), mul:Math.random()});
  osc4 = T("sin", {freq:opts.freq * Math.random(), mul:Math.random()});
  env  = T("linen", {a: a, d:d, s:s, r:r, lv:0.1}, osc1, osc2, osc3, osc4);
  console.log([osc1, osc2, osc3, osc4])
  return env.on("ended", opts.doneAction).bang().play();
};

// add squares
// it would be cool if the user could choose a range of notes
// and the composition would randomly trigger notes within 
// that range.
$(function() {  
  for(var i = 48; i < 66; i++) {
    $("#board").append("<div class='square' id='"+ parseInt(i) + "'></div>")
  }
  // play notes at random intervals
  setInterval(function() {
    var note = parseInt(Math.random() * (66 - 48) + 48)
    var square = $("#" + note)
    if(!$(square).hasClass("active")) {
      $("#" + note)[0].click()  
    } 
  }, Math.random() * 36000)
})
// click event listener just in case 
$("#board").on("click", ".square", function() {
  var square = $(this)
  $(this).fadeIn(20000).addClass("active");
  var note = parseInt($(this)[0].id);
  var freq = parseInt(sc.midicps(note));
  var velocity = .5
  // var synth = new Synth(freq);
  var scale = sc.Scale.major().degreeToFreq(sc.Range(7), freq).asInteger();
  synth.noteOn(note, velocity, square);
})
