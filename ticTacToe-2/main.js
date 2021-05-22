'use strict'

const gameField = document.querySelector('.game-field'),
    restartBtn = document.querySelector('.btn-restart'),
    infoTxt = document.querySelector('.next b'),
    whichSymbol = document.querySelector('.next p');

// Fill in the gamefield rects
for (let i = 0; i < 9; i++) {
    gameField.insertAdjacentHTML('beforeend', `<div class="game-rect" data-field-number=${i}></div>`);
}

// Arr from 9 game rectangles
const rects = document.querySelectorAll('.game-rect');

// Variable to determine the parity of the click
let evenOdd = 0;

// Winning combinations
const winCombines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const selectedCellsX = [];
const selectedCellsO = [];

//Function with actions after each click
const gameClickHandler = (e) => {

    if (e.target.classList.contains('game-rect') && !e.target.hasAttribute('data-symbol')) {
        const target = e.target;
        evenOdd++;

        

        if (evenOdd % 2 === 1 && evenOdd !== 9) {
            selectedCellsX.push(+target.getAttribute('data-field-number'));
            target.textContent = '☠';
            target.setAttribute('data-symbol', 'cross');

            whichSymbol.textContent = '❂';

            if (checkCombines('cross')) {
                whichSymbol.textContent = '☠';
            }

        } else if (evenOdd % 2 === 0) {
            selectedCellsO.push(+target.getAttribute('data-field-number'));
            target.textContent = '❂';
            target.setAttribute('data-symbol', 'zero');

            whichSymbol.textContent = '☠';

            if (checkCombines('zero')) {
                whichSymbol.textContent = '❂';
            }

        } else if (evenOdd === 9) {
            selectedCellsX.push(+target.getAttribute('data-field-number'));
            target.textContent = '☠';
            target.setAttribute('data-symbol', 'cross');

            if (checkCombines('cross')) { //Remove bag with draw
                whichSymbol.textContent = '☠';

            } else {
                gameField.removeEventListener('click', gameClickHandler);
                whichSymbol.textContent = '';

                infoTxt.textContent = 'It is a draw';
                infoTxt.style.color = 'rgb(189, 135, 250)';

                target.textContent = '☠';
                restartBtn.classList.add('pulse');
            }
        }
    }
}

gameField.addEventListener('click', gameClickHandler);

// Check symbols inside combinations
function checkCombines(symbol) {
    let hasWinner = false;
    const currentSelectedArray = evenOdd % 2 ? selectedCellsX : selectedCellsO;
    if (evenOdd > 4) {
        //In each win line we check symbol in every rectangle
        winCombines.forEach(winLine => {
                const isWin = winLine.every(winCell => {
                    console.log(currentSelectedArray);
                    console.log(winCell);
                    console.log(currentSelectedArray.indexOf(winCell))
                    return currentSelectedArray.indexOf(winCell) !== -1
                });
                console.log(isWin);
                if (isWin) {
                    hasWinner = true;

                    winLine.forEach(cellId => rects[cellId].classList.add('win'));
                    gameField.removeEventListener('click', gameClickHandler);

                    infoTxt.textContent = 'Winner is --->';
                    infoTxt.style.color = 'rgb(189, 135, 250)';
                    
                    restartBtn.classList.add('pulse');
                }
            
            
        });
    }

    return hasWinner;

}

// Reload page
restartBtn.addEventListener('click', (e) => {
    window.location.reload();
});