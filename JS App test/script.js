'use strict'

const body = document.querySelector('body'),
    questions = document.querySelectorAll('.question'),
    answers = document.querySelectorAll('.option input'),
    btnTryAgain = document.querySelector('.try-again');

let usersAnswers = [],
    missCounter = 0,
    correctCounter = 0,
    wrongCounter = 0;


    body.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-check')) {
            usersAnswers = Array.from(answers).filter(item => item.checked);
            usersAnswers.forEach(item => {
                if (item.parentElement.dataset.correct === 'true') {
                    item.parentElement.classList.add('correct');
                } else {
                    item.parentElement.classList.add('wrong');
                }
            });
            questions.forEach(item => {
                let hasCheckedInput = false;

                item.querySelectorAll('input').forEach(itemInput => {
                    
                    if (itemInput.checked) {
                        hasCheckedInput = true;
                    }
                });

                if (!hasCheckedInput) {
                    item.classList.add('missed');
                }
            });

            missCounter = document.querySelectorAll('.missed').length;
            correctCounter = document.querySelectorAll('.correct').length;
            wrongCounter = document.querySelectorAll('.wrong').length;

            alert(` Правильных ответов: ${correctCounter} \n Неправильных ответов: ${wrongCounter} \n Пропущенные: ${missCounter}`);
        }
        
    })

    
