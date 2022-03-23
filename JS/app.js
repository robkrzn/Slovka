//Data
let word ='';
const maxWordLenght = 5;

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

    //animeRowShake(currentRow());
    animateTileReveal(currentRow());
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
    return document.querySelector('.row');
}
