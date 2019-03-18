
//------- Variabler ---------------------------------------------------------------------------- 
//----------------------------------------------------------------------------------------------  

const qwerty = document.querySelector('#qwerty');
const phraseSection = document.querySelector('#phrase ul');

const overlay = document.querySelector('#overlay');
const scoreBoard = document.querySelectorAll('#scoreboard img');

let missedScore = 0;

//------- SVAR -------------------------------------------------------------------------------- 
//--------------------------------------------------------------------------------------------- 

const phrases = [
    'roflmao',
    'lol',
    'swagetti bolognice',
    'solskjaer tabellen',
    'what what in the butt',
    'yo sup'
];

//------- START GAME -------------------------------------------------------------------------- 
//--------------------------------------------------------------------------------------------- 

overlay.addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
        overlay.style.display = 'none';
    }
});

//------- VELGE HVILKET RANDOM SVAR ----------------------------------------------------------- 
//--------------------------------------------------------------------------------------------- 

const getRandomPhrase = function(phrase) {
    let randomNum = Math.floor(Math.random() * (phrase.length));
    let randomWord = phrase[randomNum];
    let phraseArr = [];
    for (letter of randomWord) {
        phraseArr.push(letter);
    }
    return phraseArr;
};
const addPhrase = function(arr) {
    for (array of arr) {
        let li = document.createElement('li');
        li.textContent = array;
        li.className = (array === " ") ? 'space' : 'letter';
        phraseSection.appendChild(li);
    }
}

let phraseArr = getRandomPhrase(phrases);
addPhrase(phraseArr);

//------- ER BOKSTAV RETT?  ------------------------------------------------------------------- 
//--------------------------------------------------------------------------------------------- 

let phraseList = phraseSection.querySelectorAll('li');

const checkLetter = function(letter) {
    let result = null;
    for (li of phraseList) {
        if (li.className === 'letter' && li.textContent === letter) {
            li.className = 'show';
            result = letter;
        }        
    }
    return result
};

//------- FEIL BOKSTAV? ------------------------------------------------------------------ 
//--------------------------------------------------------------------------------------------- 

const checkLose = function() {
    scoreBoard[missedScore].src = 'images/lostHeart.png';
    missedScore += 1;
    if (missedScore === scoreBoard.length) {
        resetGame('lose');
    }
}

//------- LEGGE KLASSE TIL BOKSTAVER SOM ER VALGT --------------------------------------------- 
//--------------------------------------------------------------------------------------------- 


qwerty.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON') {
        e.target.className = 'chosen';
        e.target.disabled = true;
        let letterFound = checkLetter(e.target.textContent);
        letterFound ? checkWin() : checkLose();
    }
});

//------- RESET HVIS ALLE BOKSTAVER ER RETT --------------------------------------------------- 
//--------------------------------------------------------------------------------------------- 

const checkWin = function() {
    let isLetter = false;
    for (li of phraseList) {
        li.className === 'letter' ? isLetter = true : null;
    }
    if (!isLetter) {
        resetGame('win')
    }
};

//------- RESET SPILL NÅR FERDIG  ------------------------------------------------------------- 
//--------------------------------------------------------------------------------------------- 
 

const resetGame = function(playAgain) {
    setTimeout(function() {
        overlay.className = playAgain;
        overlay.style.display = '';
        overlay.firstElementChild.textContent = 'Play Again?';
        overlay.lastElementChild.textContent = 'Reset Game';
        phraseSection.innerHTML = '';
        phraseArr = getRandomPhrase(phrases);
        addPhrase(phraseArr);
        phraseList = phraseSection.querySelectorAll('li');
        missedScore = 0;
        let buttons = qwerty.querySelectorAll('button');
        buttons.forEach(function(button) {
            button.className = '';
            button.disabled = false;
        });
        scoreBoard.forEach(function(img) {
            img.src = 'images/liveHeart.png'
        })
    }, 1000)
};


