'use strict'

const body = document.querySelector('body'),
    gameField = document.querySelector('.count-body'),
    startBtn = document.querySelector('.game-start'),
    timeBtn = document.querySelector('.game-time'),
    btnNumbers = document.querySelectorAll('.btn-number'),
    timerWrapper = document.querySelector('.timer-counter');

const numbersArr = [];

for (let i = 1; i < 26; i++) {
    numbersArr.push(i);
}

for (let i = 1; i < 26; i++) {
    let random = Math.floor(Math.random()*(numbersArr.length));
    const random255 = () => Math.round(Math.random() * 255)
    const randomColorRGB = `rgb(${random255()}, ${random255()}, ${random255()})`
    const randomFontSize = Math.round(Math.random() * 20) + 20
    gameField.insertAdjacentHTML('beforeend', `<div data-number=${numbersArr[random]} class="btn-number" style="color: ${randomColorRGB}; font-size: ${randomFontSize}px">${numbersArr[random]}</div>`);
    numbersArr.splice(random, 1);
}

let timeToPlay = 5 * 1000;
let isGameStarted = false;
let isGameFinished = false;
let didUserWin = false;
let currentNumber = 1;
let timer;

function startGame () {
    isGameStarted = true;
    timer = setInterval(function() {
        if (timeToPlay > 0) {
            timeToPlay -= 10;
            timerWrapper.innerText = timeToPlay/1000;
        } else {
            stopGame();
            timerWrapper.innerText = timeToPlay/1000;
        }
    }, 10);
}

function stopGame() {
    clearInterval(timer);
    isGameFinished = true;
    isGameStarted = false;
    if (didUserWin) {
        alert(`Congratulation! You win! Your time is ${(60 - timeToPlay/1000).toFixed(2)} sec`)
    } else {
        alert('Game over! You lost!')
    }
}

    body.addEventListener('click', (event) => {
        if (event.target.classList.contains('game-start')) {
            startGame();            
        }
        if (isGameStarted) {
            if (event.target.classList.contains('btn-number') && currentNumber < 26) {
                console.log(event.target.dataset.number);
                console.log(currentNumber);
                console.log(parseInt(event.target.dataset.number) === currentNumber);

                if (parseInt(event.target.dataset.number) === currentNumber) {
                    event.target.classList.add('right');
                    currentNumber += 1;
                    if (currentNumber === 26) {
                        didUserWin = true;
                        stopGame();
                    }
                }
            }
        }
        
    })