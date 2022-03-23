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
        tile.classList.remove('animate__bounceIn', 'animate__flipInY');

        setTimeout(()=>{
            tile.classList.add('animate__flipInY', `animate__delay-${index}s`);
        },0)
    });
}