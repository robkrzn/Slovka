//Data
const maxWordLenght = 5;
const countOfTries = 6;

let word ='';
let solution = allWords[allWords.length * Math.random() | 0].toLowerCase();
let tries = 1;

//keyboard
document.addEventListener('keydown', (event)=>{
    if(event.key == 'Enter'){
        submitWord();
    }
    else if(event.key == 'Backspace'){
        removeLetter();
    }
    else{
        addLetter(event.key);
    }
});

//submit
const submitWord = () => {
    if( word.length != maxWordLenght) return;

    //is this a real world?
    if(!allWords.includes(word)){
        animeRowShake(currentRow());
        return ;
    }

    //animeRowShake(currentRow());
    animateTileReveal(currentRow());

    
    setTimeout(() => {
        judgeResult();
    },1500)
}

//add letters
const addLetter = (character) => {
    if( word.length >= maxWordLenght) return;

    //allow only latters
    if(/^\p{L}$/u.test(character)){
        word = word + character;
        word = word.toLowerCase();

        let tile = currentTile();
        tile.innerHTML = character;
        animateTileBounce(tile);
        
    }

    console.log(word);
}

const removeLetter = () => {
    if( word.length <= 0) return;

    let tile = currentTile();
    tile.innerHTML = '';
    tile.className = 'tile';

    word = word.slice(0 , -1);
    console.log(word);
}

//tile to update
const currentTile = () => {
    return currentRow().querySelector(':nth-child('+word.length+')');
}

//curentRow
const currentRow = () => {
    return document.querySelector('.row:nth-child('+tries+')');
}

const judgeResult = () => {
    if(word == solution){
        animateTileDance(currentRow());
    }
    else if(tries >= countOfTries){
        youVeryMuchLose();
    }
    else{
        word='';
        tries++;
    }
}
