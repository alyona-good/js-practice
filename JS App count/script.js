'use strict'

const body = document.querySelector('body'),
    gameField = document.querySelector('.count-body'),
    startBtn = document.querySelector('.game-start'),
    timeBtn = document.querySelector('.game-time'),
    btnNumbers = document.querySelectorAll('.btn-number'),
    modal = document.querySelector('.modal'),
    finalMsg = document.querySelector('.modal-msg'),
    closeBtnModal = document.querySelector('.close-btn-modal'),
    overflow = document.querySelector('.overflow'),
    timerWrapper = document.querySelector('.timer-counter');

const numbersArr = [];

for (let i = 1; i < 26; i++) {
    numbersArr.push(i);
}

// Field decoration
for (let i = 1; i < 26; i++) {
    let random = Math.floor(Math.random()*(numbersArr.length));
    const random255 = () => Math.round(Math.random() * 255);
    const randomColorRGB = `rgb(${random255()}, ${random255()}, ${random255()})`;
    const randomFontSize = Math.round(Math.random() * 20) + 20;
    gameField.insertAdjacentHTML('beforeend', `<div data-number=${numbersArr[random]} class="btn-number" style="color: ${randomColorRGB}; font-size: ${randomFontSize}px">${numbersArr[random]}</div>`);
    numbersArr.splice(random, 1);
}

// Game time
let timeToPlay = 60 * 1000;

// Flags
let isGameStarted = false;
let isGameFinished = false;
let didUserWin = false;

//Order of the current number
let currentNumber = 1;

//Variable for timer
let timer;

function openModal () {
    modal.classList.add('active');
    overflow.style.display = 'block';
}

function closeModal () {
    modal.classList.remove('active');
    overflow.style.display = 'none';
}

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
        openModal();
        finalMsg.textContent = 'You won';
    } else {
        openModal();
        finalMsg.textContent = 'You lost';
    }
}

    body.addEventListener('click', (event) => {

        if (event.target.classList.contains('game-start')) {
            startGame();            
        }

        if (isGameStarted) {
            if (event.target.classList.contains('btn-number') && currentNumber < 26) {
                if (parseInt(event.target.dataset.number) === currentNumber) {
                    console.log(currentNumber);
                    event.target.classList.add('right');
                    currentNumber += 1;
                    if (currentNumber === 26) {
                        didUserWin = true;
                        stopGame();
                    }
                }
            }
        }

        if (event.target.classList.contains('close-btn-modal')) {
            closeModal();
            location.reload();
        }
        
    })