//bounce when you add new letter
const animateTileBounce = (tile) => {
  tile.classList.add("is-filled", "animate__animated", "animate__bounceIn");
};

//shake whole row, when you submit a not-existant word
const animeRowShake = (row) => {
  row.classList.remove("animate__shakeX");
  setTimeout(() => {
    row.classList.add("animate__animated", "animate__shakeX");
  }, 0);
};

//rotate tile, when you submit an existing word
const animateTileReveal = (row) => {
  row.querySelectorAll(".tile").forEach((tile, index) => {
    tile.classList.remove("animate__bounceIn", "animate__flipInY");
    setTimeout(() => {
      tile.style.visibility = "visible";
      tile.classList.add("animate__flipInY", `animate__delay-${index}s`);
    }, 0);

    /*
        if(index==maxWordLenght-1){
            tile.addEventListener('animationend', () => {
                judgeResult();
                console.log(`wam ${index}`);
            });
        }
        */
  });
};

//dance when you win
const animateTileDance = (row) => {
  row.querySelectorAll(".tile").forEach((tile, index) => {
    tile.innerHTML = solution.charAt(index);

    tile.classList.remove(
      "animate__bounceIn",
      "animate__flipInY",
      "animate__bounce"
    );

    setTimeout(() => {
      tile.classList.add("animate__bounce", `animate__delay-${index}s`);
    }, 0);
  });
};

//game over
const youVeryMuchLose = () => {
    let board = document.querySelector('.board');
    board.classList.add('animate__animated', 'animate__hinge');
    setTimeout(()=>{
        let correctWord = document.querySelector(".correctAnswer");
        correctWord.textContent= solution.toUpperCase();
        animateWordBackIn(correctWord);
    },2000);
}

//game over keyboard
const keyboardEnd = () => {
    let keyboard = document.querySelector('.keyboard');
    setTimeout(()=>{
    keyboard.classList.add('animate__animated', 'animate__flipOutX');
    },3000);
}

//replay button back in
const replayButtonBackIn = () => {
    // again button
    let winnerButton = document.querySelector('.replayButton');
    setTimeout(() => {
        winnerButton.style.visibility = 'visible';
        winnerButton.classList.add('animate__animated', 'animate__flipInX');
    }, 3500);

}

//correct answer
const animateWordBackIn = (word) => {
  word.classList.add("animate__animated", "animate__backInUp");
};

//highligh letter
const highlightLetters = (row) => {
  let pressentLetters = [];

  row.querySelectorAll(".tile").forEach((tile, index) => {
    tile.style.visibility = "hidden";

    let letter = noAccents(word.charAt(index));
    let colorClass = "wrong";

    //ak psimena su aj spravne aj obsahuje zobraz len spravne
    //zobraz len jedno zlte pismeno
    if (noAccentSolution.includes(letter)) {
      if (
        !lettersInRow.correct.includes(letter) &&
        !pressentLetters.includes(letter)
      ) {
        colorClass = "present";
        pressentLetters.push(letter);
      }
    }

    if (noAccentSolution.charAt(index) == letter) {
      colorClass = "correct";
    }

    tile.classList.add(colorClass);
  });

  // keyboard row in footer
  document.querySelectorAll(".keyboard .tile").forEach((tile) => {
    let colorClass = "";

    if (lettersInRow.wrong.includes(tile.id)) colorClass = "wrong";
    if (lettersInRow.present.includes(tile.id)) colorClass = "present";
    if (lettersInRow.correct.includes(tile.id)) colorClass = "correct";

    if (colorClass) tile.classList.add(colorClass);
  });
};
