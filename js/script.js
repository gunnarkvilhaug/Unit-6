
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
    'manchester united',
    'ajax',
    'manchester city',
    'liverpoop',
    'porto',
    'barcelona',
    'juventus',
    'spurs'
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

const getRandomPhrase = (phrase) => {
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


