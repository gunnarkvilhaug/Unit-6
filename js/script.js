
// -------------------- Variables --------------------------------------------------------

const phrases = [
    'gunnar',
    'harald',
    'hein tore',
    'anders',
    'daniel',
    'appex',
    'deco'
];

const overlayDiv = document.querySelector('#overlay');
const phraseSection = document.querySelector('#phrase ul');
const qwerty = document.querySelector('#qwerty');
const scoreBoardImg = document.querySelectorAll('#scoreboard img');
let missedScore = 0;


// Press "Start Game" button to remove overlay <div>
overlayDiv.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        overlayDiv.style.display = 'none';
    }
});

// list of possible phrase for game

//     Return a random phrase in array
const getRandomPhraseAsArray = (phrase) => {
    let randomNum = Math.floor(Math.random() * (phrase.length));
    let randomWord = phrase[randomNum];
    let phraseArr = [];
    for (letter of randomWord) {
        phraseArr.push(letter);
    }
    return phraseArr;
};

const addPhrasetoDisplay = (array) => {
    for (arr of array) {
        let li = document.createElement('li');
        li.textContent = arr;
        li.className = (arr === " ") ?  'space' : 'letter';
        // if (arr == " ") {
        //     li.className = 'space';
        // } else {
        //     li.className = 'letter';
        // }
        phraseSection.appendChild(li);
    }
}

let phraseArray = getRandomPhraseAsArray(phrases);
addPhrasetoDisplay(phraseArray);

//================================================================================
//  function to check if letter guessing is right, return the letter if true

let phraseList = phraseSection.querySelectorAll('li');

const checkLetter = (letter) => {
    let result = null;
    for (li of phraseList) {
        if (li.className === 'letter' && li.textContent === letter) {
            li.className = 'show';
            result = letter;
        }
    }
    return result
};

// function to run if letter guess is right, will resetGame() if no more .letter class in phrase
const checkWin = () => {
    let isLetter = false;
    for (li of phraseList) {
        li.className === 'letter' ? isLetter = true : null;
    }
    if (!isLetter) {
        resetGame('win')
    }
};
// function to run if letter guess is wrong, will change socreBoard img, and if missedScore accumulate to length of scoreBoardImg, will resetGame()
const checkLose = () => {
    scoreBoardImg[missedScore].src = 'images/lostHeart.png';
    missedScore += 1;
    if (missedScore === scoreBoardImg.length) {
        resetGame('lose');
    }
}

//  event listener to on screen keyboard picks, add a class and disabled click
qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        e.target.className = 'chosen';
        e.target.disabled = true;
        let letterFound = checkLetter(e.target.textContent);
        letterFound ? checkWin() : checkLose();
    }
});
// function to reset the game
const resetGame = (winLose) => {
    setTimeout(() => {
        overlayDiv.className = winLose;
        overlayDiv.style.display = '';
        overlayDiv.lastElementChild.textContent = 'Reset Game';
        phraseSection.innerHTML = '';
        // while (phraseSection.childElementCount > 0) {
        //     phraseSection.removeChild(phraseSection.children[0])
        // }
        phraseArray = getRandomPhraseAsArray(phrases);
        addPhrasetoDisplay(phraseArray);
        phraseList = phraseSection.querySelectorAll('li');
        missedScore = 0;
        let buttons = qwerty.querySelectorAll('button');
        buttons.forEach(button => {
            button.className = '';
            button.disabled = false;
        });
        scoreBoardImg.forEach(img => {
            img.src = 'images/liveHeart.png'
        })
    }, 1000)
};
