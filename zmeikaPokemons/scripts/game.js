let flagGameStart=false;
let startDirection;
let firstGame=false;
function include(url) {
    var script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}
include("/scripts/game-algorithm.js");

window.onload=function(){
    let field=document.getElementsByClassName("field-game");
    for(let y=0;y<10;y++){
        for(let x=0;x<10;x++){
            let square=document.createElement('div');
            field[0].appendChild(square);
            square.classList.add('square');
        }
    }
    let squares=document.getElementsByClassName("square");
    for(let y=0;y<10;y++)
        for(let x=0;x<10;x++){
            squares[y*10+x].setAttribute('x',x);
            squares[y*10+x].setAttribute('y',y);
        }
    flagGameStart=true;    
    Game();
    firstGame=true;
}
   

