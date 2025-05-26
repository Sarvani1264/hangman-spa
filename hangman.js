const easy=["Apple","Chair","House","Tiger","Cloud","Grass","Water","Lemon","Smile","Pencil"];
const medium=["Lantern","Thunder","Balloon","Sandals","Puzzle","Cottage","Whistle","Crystal","Library"]
const hard=["Adventure","Umbrella","Dinosaur","Backpack","Telescope","Fireworks","Chocolate","Waterfall","Butterfly","Spaceship"];
const hangmanparts=["head","body","left-arm","right-arm","left-leg","right-leg"];

let guess_word="";
let words=[];
let current_word=[];
let word_display=document.getElementById("word_display");
let guessed_letters=[];
let wrong_guesses=0;
let result=document.getElementById("result");
let gameOver=false;
const initial_buttons=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
let buttons=[...initial_buttons];
createbuttons(initial_buttons);

function createbuttons(buttons_list){
    keyboard=document.getElementById("box");
    keyboard.innerHTML="";
    buttons_list.forEach(letter => {
        let button=document.createElement("button");
        button.innerText= letter;
        button.onclick = () => input_word(letter);
        button.classList.add("key");
        keyboard.appendChild(button);
    })
}

function togglebuttons(elements,displayVal){
    elements.forEach(element => 
        {document.getElementById(element).style.display=displayVal});
}

function play(){
    togglebuttons(["easy","medium","hard"],"block");
    togglebuttons(["play"],"none");   
}

function level(type){
    words=type;
    togglebuttons(["gamepage"],"block");
    togglebuttons(["initialpage"],"none");
    guess_word=words[Math.floor(Math.random()*words.length)].toLowerCase();
    current_word=guess_word.split("").map(()=>"_");
    word_display.innerHTML=current_word.join(" ");
}

function input_word(letter){
    result.innerHTML="";
    if (gameOver){
        result.innerHTML="*** YOU LOST ***";
        return;
    }
    if(!current_word.includes("_")){
        result.innerHTML="*** YOU WON ***";
        return;
    }
    buttons=buttons.filter(ltr => ltr!==letter);
    createbuttons(buttons);
    if(guess_word.includes(letter)){
        for(let index in guess_word){
            if(guess_word[index]==letter){
                current_word[index]=letter;
                word_display.innerHTML=current_word.join(" ");
            }
        }
    }
    Result(letter);
}

function Result(letter){
    if(!guess_word.includes(letter)){
        word_display.style.animation = "none";
        void word_display.offsetWidth;
        word_display.style.animation = "shake 0.15s ease 3";
        wrong_guesses++;
        let part = document.getElementById(hangmanparts[wrong_guesses-1]);
        part.style.display="block";
        part.style.animation= "dropIn 1s" 
        if(wrong_guesses==6){
            result.innerHTML=`*** YOU LOST ***<br>The word is "${guess_word}"`;
            togglebuttons(["restart","home"],"block");
            gameOver=true;
        }
    }
    if(!current_word.includes("_")){
        result.innerHTML="*** YOU WON ***";
        togglebuttons(["restart","home"],"block");
    }
}

function restart(){
    wrong_guesses=0;
    createbuttons(initial_buttons);
    buttons=[...initial_buttons];
    for(let i=0;i<hangmanparts.length;i++){
        document.getElementById(hangmanparts[i]).style.display="none";
    }
    result.innerHTML="";
    togglebuttons(["restart","home"],"none");
    gameOver=false;
    level(words);
}

function home(){
    wrong_guesses=0;
    createbuttons(initial_buttons);
    buttons=[...initial_buttons];
    for(let i=0;i<hangmanparts.length;i++){
        document.getElementById(hangmanparts[i]).style.display="none";
    }
    result.innerHTML="";
    togglebuttons(["restart","home","gamepage"],"none");
    gameOver=false;
    togglebuttons(["initialpage"],"block");
}
