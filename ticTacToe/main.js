'use strict'

const gameField = document.querySelector('.game-field'),
    restartBtn = document.querySelector('.btn-restart'),
    infoTxt = document.querySelector('.next b'),
    whichSymbol = document.querySelector('.next p');

// Fill in the gamefield
for (let i = 0; i < 9; i++) {
    gameField.insertAdjacentHTML('beforeend', `<div class="game-rect" data-field-number=${i + 1}></div>`);
}

// Arr from 9 game rectangles
const rects = document.querySelectorAll('.game-rect');

// Variable for determining the click
let evenOdd = 0;

// Winning combinations
const winCombines = [
    [rects[0], rects[1], rects[2]],
    [rects[3], rects[4], rects[5]],
    [rects[6], rects[7], rects[8]],
    [rects[0], rects[3], rects[6]],
    [rects[1], rects[4], rects[7]],
    [rects[2], rects[5], rects[8]],
    [rects[0], rects[4], rects[8]],
    [rects[2], rects[4], rects[6]]
];

const gameClickHandler = (e) => {

    if (e.target.classList.contains('game-rect') && !e.target.hasAttribute('data-symbol')) {
        evenOdd++;
        if (evenOdd % 2 === 1 && evenOdd !== 9) {
            e.target.textContent = '☠';
            e.target.setAttribute('data-symbol', 'cross');
            whichSymbol.textContent = '❂';
            if (checkCombines('cross')) {
                whichSymbol.textContent = '☠';
            }
        } else if (evenOdd % 2 === 0 && evenOdd !== 9) {
            e.target.textContent = '❂';
            e.target.setAttribute('data-symbol', 'zero');
            whichSymbol.textContent = '☠';
            if (checkCombines('zero')) {
                whichSymbol.textContent = '❂';
            }
        } else if (!(checkCombines('cross')) && !(checkCombines('zero')) && evenOdd === 9) {
            gameField.removeEventListener('click', gameClickHandler);
            whichSymbol.textContent = '';
            infoTxt.textContent = 'It is a draw';
            infoTxt.style.color = 'rgb(189, 135, 250)';
            e.target.textContent = '☠';
            restartBtn.classList.add('pulse');
        }
    }
}

gameField.addEventListener('click', gameClickHandler);

// Check symbols inside combinations
function checkCombines(symbol) {
    let hasWinner = false;
    //Find in each win line symbol in every rectangle
    winCombines.forEach(winLine => {
        const isWin = winLine.every(rect => rect.dataset.symbol === symbol);
        if (isWin) {
            hasWinner = true;
            winLine.forEach(rect => rect.classList.add('win'));
            gameField.removeEventListener('click', gameClickHandler);
            infoTxt.textContent = 'Winner is --->';
            infoTxt.style.color = 'rgb(189, 135, 250)';
            restartBtn.classList.add('pulse');
            
        }
    });
    return hasWinner;
}

// Reload page
restartBtn.addEventListener('click', (e) => {
    window.location.reload();
});