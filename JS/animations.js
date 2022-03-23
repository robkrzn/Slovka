//bounce when you add new letter
const animateTileBounce = (tile) => {
    tile.classList.add('is-filled', 'animate__animated', 'animate__bounceIn');
}

//shake whole row, when you submit a not-existant word
const animeRowShake = (row) => {
    row.classList.remove('animate__shakeX');
    setTimeout(()=>{
        row.classList.add('animate__animated', 'animate__shakeX'); 
    },0)
}

//rotate tile, when you submit an existing word
const animateTileReveal = (row) => {
    row.querySelectorAll('.tile').forEach((tile,index) => {
        let tileLetter = word.charAt(index);
        let colorClass = 'wrong';

        if(solution.includes(tileLetter)){
            colorClass='present';
        }

        if(solution.charAt(index)==tileLetter){
            colorClass = 'correct';
        }

        tile.classList.add(colorClass);

        tile.classList.remove('animate__bounceIn', 'animate__flipInY');

        setTimeout(()=>{
            tile.classList.add('animate__flipInY', `animate__delay-${index}s`);
        },0);

        /*
        if(index==maxWordLenght-1){
            tile.addEventListener('animationend', () => {
                judgeResult();
                console.log(`wam ${index}`);
            });
        }
        */
    });
}

//dance when you win
const animateTileDance = (row) => {
    row.querySelectorAll('.tile').forEach((tile,index) => {
        tile.classList.remove('animate__bounceIn', 'animate__flipInY', 'animate__bounce');

        setTimeout(()=>{
            tile.classList.add('animate__bounce', `animate__delay-${index}s`);
        },0);
    });
}

//game over
const youVeryMuchLose = () => {
    let board = document.querySelector('.board');
    board.classList.add('animate__animated', 'animate__hinge');
    setTimeout(()=>{
        let correctWord = document.querySelector(".correctAnswer");
        correctWord.textContent= solution.toUpperCase();
        animateWordBackIn(correctWord);
    },2000)
}

//correct answer 
const animateWordBackIn = (word) => {
    word.classList.add('animate__animated', 'animate__backInUp');
}