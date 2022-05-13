/*
C - 67
D - 68
E - 69
F - 70
G - 71
A - 65
B - 66

*/

let root;

window.addEventListener("keydown", onKeyPress);
const bars = document.querySelectorAll(".bar");


export function init(rootElement) {
  root = rootElement;
}

function onBarMouseOver(barObject) {                                               
  if (silenceBar(barObject)) getNoteByBar(barObject);
}

function onBarClick(barObject) {                                                   
  toggleBarDisabledStateOrAble(barObject);
}

function onKeyPress(event) {                                                      
  var barObject = document.querySelector(`.bar[data-key="${event.keyCode}"]`);
  if (silenceBar(barObject)) getNoteByBar(barObject);
}

function toggleBarDisabledStateOrAble(barObject) {                                          
   barObject.disabled = !barObject.disabled;
   if (barObject.disabled)  
   {
    barObject.classList.add('disabled');
    var trek = getTrekByBar(barObject);
    trek.pause();
    trek.currentTime = 0;
   }
   else 
   {
    barObject.classList.remove('disabled');
   }
}

function isBar(element) {   
  element.forEach(barObject => barObject.addEventListener("mouseover", () => { onBarMouseOver(barObject); } ));   
  element.forEach(barObject => barObject.addEventListener("click", () => { onBarClick(barObject); } ));                                                                                  // все действия с баром
}

function getNoteByBar(barObject) { 
  var trek = getTrekByBar(barObject);
  trek.currentTime = 0;
  trek.play();
}                                                                                 
    
function silenceBar(barObject) {                                                     
  if (barObject.disabled) return 0;
  else return 1;
}

function getTrekByBar(barObject) {
  var note = barObject.getAttribute(`data-note`);
  return document.querySelector(`audio[data-note-second="${note}"]`);
}


isBar(bars);