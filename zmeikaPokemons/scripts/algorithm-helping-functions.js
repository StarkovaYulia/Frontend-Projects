function generatepos(){
    let posX=Math.round(Math.random()*(10-1));
    let posY=Math.round(Math.random()*(10-1));
    return [posX,posY];
}
function SwitchPokemon(){
    let x=Math.round(Math.random()*(13-1)+1);
    console.log(x);
    let str="url";
    switch(x){
       case 1:
        str=str +"('/img/pokemons/001.png')";
        break;
       case 2:
        str=str +"('/img/pokemons/002.png')";
        break;
       case 3:
        str=str +"('/img/pokemons/003.png')";
        break;
       case 4:
        str=str +"('/img/pokemons/004.png')";
        break;
       case 5:
        str=str +"('/img/pokemons/005.png')";
        break;
       case 6:
        str=str +"('/img/pokemons/006.png')"; 
        break;
       case 7:
        str=str +"('/img/pokemons/007.png')";
        break;
       case 8:
        str=str +"('/img/pokemons/008.png')";
        break;
       case 9:
        str=str +"('/img/pokemons/009.png')";
        break;
       case 10:
        str=str +"('/img/pokemons/010.png')";
        break; 
       case 11:
        str=str +"('/img/pokemons/011.png')";
        break;
       case 12:
        str=str +"('/img/pokemons/012.png')";
        break;
       case 13:
        str=str +"('/img/pokemons/013.png')";
        break; 
    }
    return str;
}

function howToRotatePokemon(head,firstPokemon)
{
    if(head.getAttribute('x')===firstPokemon.getAttribute('x')){
        if((parseInt(head.getAttribute('y'))-parseInt(firstPokemon.getAttribute('y')))>0)
            return 'rotate(90deg) scale(-1,1)';
        else
            return 'rotate(-90deg) scale(-1,1)';
    }
    else{
        if((parseInt(head.getAttribute('x'))-parseInt(firstPokemon.getAttribute('x')))>0)
            return 'scale(-1,1)';   
        else
            return '';   
    }
}