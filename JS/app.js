const devVersion = false;

//Data
const maxWordLenght = 5;
const countOfTries = 6;

let word = "";
let tries = 1;
let languageSwitch = true;

let allWords = allWordsSK;

let solution = allWords[allWords.length * Math.random() | 0].toLowerCase();
let noAccentSolution = noAccents(solution);
let noAccentWords = allWords.map((x) => noAccents(x));

let lettersInRow = {
  correct: [],
  present: [],
  wrong: [],
};

//keyboard
document.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    submitWord();
  } else if (event.key == "Backspace") {
    removeLetter();
  } else {
    addLetter(event.key);
  }
});

//submit
const submitWord = () => {
  if (word.length != maxWordLenght) return;

  if(!devVersion)
  {
  //is this a real world?
  if (!noAccentWords.includes(noAccents(word))) {
    animeRowShake(currentRow());
    return;
  }
  }
  findLettersInRow();
  //console.dir(lettersInRow);

  highlightLetters(currentRow());
  animateTileReveal(currentRow());
  setTimeout(() => {
    judgeResult();
  }, 1500);
};

//add letters
const addLetter = (character) => {
  if (word.length >= maxWordLenght) return;

  //allow only latters
  if (/^\p{L}$/u.test(character)) {
    word = word + character;
    word = word.toLowerCase();

    let tile = currentTile();
    tile.innerHTML = character;
    animateTileBounce(tile);
  }

};

const removeLetter = () => {
  if (word.length <= 0) return;

  let tile = currentTile();
  tile.innerHTML = "";
  tile.className = "tile";

  word = word.slice(0, -1);
};

//tile to update
const currentTile = () => {
  return currentRow().querySelector(":nth-child(" + word.length + ")");
};

//curentRow
const currentRow = () => {
  return document.querySelector(".row:nth-child(" + tries + ")");
};

const judgeResult = () => {
    if(noAccents(word) == noAccentSolution){
        animateTileDance(currentRow());
        keyboardEnd();
        replayButtonBackIn();
    }
    else if(tries >= countOfTries){
        youVeryMuchLose();
        keyboardEnd();
        replayButtonBackIn();
    }
    else{
        word='';
        tries++;
    }
}

// FIND ALL LETTERS FOR CURRENT ROW
const findLettersInRow = () => {
  let present = [];
  let correct = [];
  let wrong = [];

  [...word].forEach((letter, index) => {
    letter = noAccents(letter);

    // letter in correct place
    if (noAccentSolution.charAt(index) == letter) {
      correct.push(letter);
    }
    // letter in wrong place
    else if (noAccentSolution.includes(letter)) {
      present.push(letter);
    }
    // wrong number
    else {
      wrong.push(letter);
    }
  });

  lettersInRow = {
    present,
    correct,
    wrong,
  };
};

// REMOVE ACCENTS
function noAccents(str) {
  return str.normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

// MOBILE
const keyboard = document.querySelector(".keyboard");
keyboard.addEventListener("click", (event) => {
  // clicked on button?
  if (event.target.nodeName !== "BUTTON") return;

  let character = event.target.id;

    if(event.target.className=="replayButton"){
        window.location.reload();
    }
    
    if (character === '???') {
        submitWord()
    }
    else if (character === '???') {
        removeLetter()
    }
    else {
        addLetter(character)
    }
})


//replay
const replay = document.querySelector('.replay')
replay.addEventListener('click', (event) => {
    // clicked on button?
    if (event.target.nodeName !== 'BUTTON') return
    
    console.log(event.target.className)
    if(event.target.className.includes("replayButton")){
        window.location.reload();
    }
});

const languageVersion = document.querySelector('.languageVersion')
languageVersion.addEventListener('click', (event) => {
  
  if(event.target.className== "toggle-checkbox"){
    if(languageSwitch)
    {
      allWords = allWordsCZ;
      languageSwitch = !languageSwitch;

      document.querySelector('.headerSmallFlag').textContent="~????????~";
      document.querySelector('.headerSmall').textContent="P???? klidn?? bez diakritiky";
      document.querySelector('.playButton').textContent="Spusti hru";
      document.querySelector('.replayButton').textContent="Hr??t znovu ";
    }
    else
    {
      allWords = allWordsSK;
      languageSwitch = !languageSwitch;

      document.querySelector('.headerSmallFlag').textContent="~????????~";
      document.querySelector('.headerSmall').textContent="P???? pokojne bez diakritiky";
      document.querySelector('.playButton').textContent="Spusti?? hru";
      document.querySelector('.replayButton').textContent="Hra?? znova";
    }
  }

  if(event.target.nodeName == "BUTTON"){
    playGame();
  }
  console.log(event.target.className);

});
