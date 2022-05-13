function include(url) {
    var script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}
include("/scripts/algorithm-helping-functions.js");


let direction="";
let SavePoke_style;
let scoreInput=document.getElementById("score-count");
let highScoreInput=document.getElementById("highscore-count");
function Game(){
    let score=0;
    let startPos=generatepos();
    let snake_body=[document.querySelector('[x =  "'+ startPos[0]+ '"][y = "'+ startPos[1]+ '"]')];
    snake_body[0].classList.add("snake-head");
    let pokemon=CreatePokemon();
    let flagLose=false;
    let flagEat=false;
    let ElLink;
    let saveElLink;
    let x;
    let y;
    let EatSave_style;
    function Move(){
        if(direction==="")
            return;
        if(pokemon[0].style.backgroundImage===""){
            pokemon[0].style.backgroundImage=SavePoke_style;
        }

        let SnakeCoordinates=[snake_body[0].getAttribute('x'),snake_body[0].getAttribute('y')];
        
        flagLose+=checkonDie(SnakeCoordinates);
        if(flagLose){
            for(let i =snake_body.length-1; i>0;i--){
                snake_body[i].style.backgroundImage="";
                snake_body[i].classList.remove("snake-body");
                snake_body[i].style.transform="";
            }
            snake_body[0].classList.remove("snake-head");
            snake_body[0].style.transform="";
            pokemon[0].style.backgroundImage="";
            pokemon[0].classList.remove("pokemon");
            if(parseInt(highScoreInput.innerText)<score)
                highScoreInput.innerText=score;
            score=0;
            scoreInput.innerText=0;   
            
            clearInterval(interval);
            direction="";
            Game();
            return; 
        }

 
        if(snake_body.length!=1){
            ElLink=snake_body[snake_body.length-1].style.backgroundImage;
            for(let i =snake_body.length-1; i>0;i--){
                saveElLink=snake_body[i-1].style.backgroundImage;
                snake_body[i-1].style.backgroundImage=ElLink;
                ElLink=saveElLink;
                snake_body[i].style.transform=howToRotatePokemon(snake_body[i-1],snake_body[i]);
            }
            if(flagEat){
                snake_body.push(document.querySelector('[x =  "'+ x + '"][y = "'+ y + '"]'));
                snake_body[snake_body.length-1].classList.add("snake-body");
                snake_body[snake_body.length-1].style.backgroundImage=EatSave_style;
            }
            else{
                snake_body[snake_body.length-1].classList.remove('snake-body');
                snake_body[snake_body.length-1].style.backgroundImage="";
                snake_body[snake_body.length-1].style.transform="";
            }
            flagEat=false;
        }
        //Передвижение по полю
        if(direction==="right"){
            snake_body[0].classList.remove('offopacity');
            snake_body[0].classList.remove('snake-head');
            snake_body.pop();
            snake_body.unshift(document.querySelector('[x =  "'+ (parseInt(SnakeCoordinates[0])+1)+ '"][y = "'+ SnakeCoordinates[1]+ '"]'));
            snake_body[0].classList.add('offopacity');
            snake_body[0].classList.add('snake-head');
            if(snake_body.length>=2)
                snake_body[1].style.transform=howToRotatePokemon(snake_body[0],snake_body[1]);   
        }
        if(direction==="left"){
            snake_body[0].classList.remove('offopacity');
            snake_body[0].classList.remove('snake-head');
            snake_body.pop();    
            snake_body.unshift(document.querySelector('[x =  "'+ (parseInt(SnakeCoordinates[0])-1)+ '"][y = "'+ SnakeCoordinates[1]+ '"]'));
            snake_body[0].style.transform='scale(-1,1)';
            snake_body[0].classList.add('offopacity');
            snake_body[0].classList.add('snake-head');
            if(snake_body.length>=2)
                snake_body[1].style.transform=howToRotatePokemon(snake_body[0],snake_body[1]);
        }
        if(direction==="down"){
                snake_body[0].classList.remove('offopacity');
                snake_body[0].classList.remove('snake-head');
                snake_body.pop();    
                snake_body.unshift(document.querySelector('[x =  "'+ SnakeCoordinates[0]+ '"][y = "'+(parseInt(SnakeCoordinates[1])+1)+ '"]'));
                snake_body[0].style.transform='rotate(90deg)';
                snake_body[0].classList.add('offopacity');
                snake_body[0].classList.add('snake-head');
                if(snake_body.length>=2)
                    snake_body[1].style.transform=howToRotatePokemon(snake_body[0],snake_body[1]);    
        }
        if(direction==="up"){
                snake_body[0].classList.remove('offopacity');
                snake_body[0].classList.remove('snake-head');
                snake_body.pop();    
                snake_body.unshift(document.querySelector('[x =  "'+ SnakeCoordinates[0]+ '"][y = "'+(parseInt(SnakeCoordinates[1])-1)+ '"]'));
                snake_body[0].style.transform='rotate(-90deg)';
                snake_body[0].classList.add('offopacity');                
                snake_body[0].classList.add('snake-head');
                if(snake_body.length>=2)
                    snake_body[1].style.transform=howToRotatePokemon(snake_body[0],snake_body[1]);    
        }

        if(flagEat&&snake_body.length===1){
            snake_body.push(document.querySelector('[x =  "'+ x + '"][y = "'+ y + '"]'));
            snake_body[snake_body.length-1].classList.add("snake-body");
            snake_body[snake_body.length-1].style.backgroundImage=EatSave_style;
            flagEat=false;
        }

        //Проверка , поймали ли мы покемона или нет
        if(snake_body[0].getAttribute("x")===pokemon[0].getAttribute("x")&&snake_body[0].getAttribute("y")===pokemon[0].getAttribute("y")){
            EatSave_style=pokemon[0].style.backgroundImage;
            x=snake_body[snake_body.length-1].getAttribute("x");
            y=snake_body[snake_body.length-1].getAttribute("y");
            pokemon[0].classList.remove('pokemon');
            pokemon[0].style.backgroundImage="";
            if(snake_body.length===2)
                snake_body[1].classList.remove("snake-head");
            pokemon=CreatePokemon();
            console.log(pokemon);
            flagEat=true;
            score+=1;
            scoreInput.innerText=score; 
        }
        if(snake_body[0].classList.contains("snake-body"))
            flagLose=true;
        for(let i=1;i<snake_body.length;i++)
            snake_body[i].classList.add("snake-body");
    }


    let interval=setInterval(Move,350);
}


//Создание покемона
function CreatePokemon(){
    let pokemonpos=generatepos();
    pokemon=[document.querySelector('[x =  "'+ pokemonpos[0]+ '"][y = "'+ pokemonpos[1]+ '"]')];
    while((pokemon[0].classList.contains('snake-body')) || (pokemon[0].classList.contains('snake-head')) ){
        let pokemonpos=generatepos();
        pokemon=[document.querySelector('[x =  "'+ pokemonpos[0]+ '"][y = "'+ pokemonpos[1]+ '"]')];
    }
    pokemon[0].classList.add("pokemon");
    SavePoke_style=SwitchPokemon();
    pokemon[0].style.backgroundImage=SavePoke_style;
    SavePoke_style=pokemon[0].style.backgroundImage;
    return pokemon;
}

//Проверка, не врезаемся ли мы
function checkonDie(Pos){
    if(direction==="right"){
        if(parseInt(Pos[0])+1>=10){
            return true;
        }
    }
    if(direction==="left"){
        if(parseInt(Pos[0])-1<0){
            return true;
        }
    }

    if(direction==="up"){
        if(parseInt(Pos[1])-1<0){
            flag=true;
                return true;
        }
    }    
    if(direction==="down"){
        if(parseInt(Pos[1])+1>=10){
                return true;
        }
    }    
    return false;             
}
//обработка ввода с клавиатуры
window.addEventListener('keydown',function(event){
    if(event.key==="ArrowUp" && direction!="down"){
        direction="up";
    }
    if(event.key==="ArrowDown"&& direction!="up"){
        direction="down";
    }
    if(event.key==="ArrowLeft"&& direction!="right"){
        direction="left";
    }
    if(event.key==="ArrowRight"&& direction!="left"){
        direction="right";
    }
});


//Обработка кнопок   
let buttons=document.querySelectorAll(".control-button");
buttons.forEach(function(element){
    element.onclick=function(){
        controlButtonPressed(element);
    }
});


function controlButtonPressed(element){
    
    if(element.classList.contains('up') && direction!="down"){
        direction="up";
    }
    if(element.classList.contains('down') && direction!="up"){
        direction="down";
    }
    if(element.classList.contains('left') && direction!="right"){
        direction="left";
    }
    if(element.classList.contains('right') && direction!="left"){
        direction="right";
    }
} 
