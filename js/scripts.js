var newGameBtn = document.getElementById('js-newGameButton');

newGameBtn.addEventListener('click', newGame);

var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');
changeColor = document.getElementById("js-playerPick");



pickRock.addEventListener('click', function () { playerPick('rock'), changeColor.style.color = "blue" });
pickPaper.addEventListener('click', function () { playerPick('paper'), changeColor.style.color = "orange" });
pickScissors.addEventListener('click', function () { playerPick('scissors'), changeColor.style.color = "green" })


var gameState = 'notStarted',
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };


var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    compIsWinnerElem = document.getElementById("js-computerWinsElement");
playerIsWinnerElem = document.getElementById("js-playerWinsElement");
welcomeElem = document.getElementById('js-welcomeElement');
resultsElem = document.getElementById('js-resultsTableElement');
playerWinsVideo = document.getElementById('js-playerWinsVideo');
computerWinsVideo = document.getElementById('js-computerWinsVideo');
versus = document.getElementById('js-versus');

function setGameElements() {
    switch (gameState) {
        case 'started':
            newGameElem.style.display = 'none';
            welcomeElem.style.display = "none";
            compIsWinnerElem.style.display = "none";
            playerIsWinnerElem.style.display = "none";
            pickElem.style.display = 'block';
            resultsElem.style.display = 'block';
            playerWinsVideo.style.display = 'none';
            computerWinsVideo.style.display = 'none';
            versus.style.display = 'block';
            break;
        case 'playerWins':
            newGameBtn.innerText = 'Play again';
            newGameElem.style.display = 'block';
            welcomeElem.style.display = "none";
            compIsWinnerElem.style.display = "none";
            playerIsWinnerElem.style.display = "block";
            pickElem.style.display = 'none';
            resultsElem.style.display = 'block';
            countDown.style.display = 'none';
            versus.style.display = 'none';
            playerWinsVideo.style.display = 'block';
            playerWinsVideo.play();

            break
        case "computerWins":
            newGameBtn.innerText = 'Play again';
            newGameElem.style.display = 'block';
            welcomeElem.style.display = "none";
            compIsWinnerElem.style.display = "block";
            playerIsWinnerElem.style.display = "none";
            pickElem.style.display = 'none';
            resultsElem.style.display = 'block';
            countDown.style.display = 'none';
            computerWinsVideo.style.display = 'block';
            computerWinsVideo.play();
            versus.style.display = 'none';


            break
        case 'notStarted':
            compIsWinnerElem.style.display = "block";
            playerIsWinnerElem.style.display = "block";
        default:
            newGameElem.style.display = 'block';
            pickElem.style.display = 'none';
            resultsElem.style.display = 'none';
            compIsWinnerElem.style.display = "none";
            playerIsWinnerElem.style.display = "none";
    }
}

setGameElements();


var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');
countDown = document.getElementById('js-countDown');
openingSound = document.getElementById('js-opening-sound');


function newGame() {
    player.name = prompt('Please enter your name', 'Imię gracza');
    if (player.name) {
        player.score = computer.score = 0;
        gameState = 'started';
        setGameElements();
        setGamePoints();
        playerNameElem.innerHTML = player.name;
        countDown.play();
        openingSound.pause();
        playerWinsVideo.pause();
        computerWinsVideo.pause();
    }
}



function getComputerPick() {
    var possiblePicks = ["rock", 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random() * 3)];
}

function newColor(computerPick) {


    if (computerPick == "rock") {

        document.getElementById("js-computerPick").style.color = "blue";
    }

    if (computerPick == "paper") {
        document.getElementById("js-computerPick").style.color = "orange";
    }

    if (computerPick == "scissors") {
        document.getElementById("js-computerPick").style.color = "green";
    }
}


var playerSoundTwo = document.getElementById("js-playerSoundTwo");
var playerSoundThree = document.getElementById("js-playerSoundThree");
var playerSoundFour = document.getElementById("js-playerSoundFour");
var playerSoundFive = document.getElementById("js-playerSoundFive");


function playerWinsSoundEffects() {
    var possiblePlayerSoundEffects = [playerSoundTwo, playerSoundThree, playerSoundFour, playerSoundFive];
    console.log(possiblePlayerSoundEffects[2])
    return possiblePlayerSoundEffects[Math.floor(Math.random() * 4)];
}


var computerSoundOne = document.getElementById("js-computerSoundOne");
var computerSoundTwo = document.getElementById("js-computerSoundTwo");
var computerSoundThree = document.getElementById("js-computerSoundThree");
var computerSoundFour = document.getElementById("js-computerSoundFour");
var computerSoundFive = document.getElementById("js-computerSoundFive");

function computerWinsSoundEffects() {
    var possibleComputerSoundEffects = [computerSoundOne, computerSoundTwo, computerSoundThree, computerSoundFour, computerSoundFive];
    return possibleComputerSoundEffects[Math.floor(Math.random() * 5)];
}


var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');


function checkRoundWinner(playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = '';
    countDown.style.display = 'none';

    var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'noone';
    } else if (
        (computerPick == 'rock' && playerPick == 'scissors') ||
        (computerPick == 'scissors' && playerPick == 'paper') ||
        (computerPick == 'paper' && playerPick == 'rock')) {

        winnerIs = 'computer';

    }

    if (winnerIs == 'player') {
        playerWinsSoundEffects().play();
        playerResultElem.innerHTML = player.name + " wins!";
        player.score++;

    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = getPossibleAnswer();
        computer.score++;
        computerWinsSoundEffects().play();

    }
    setGamePoints();
}


Math.floor(Math.random() * 5)

function getPossibleAnswer() {
    var possibleAnswers = ['Shit happens!', 'Keep your hair on!', "Don't give up - try again!", "Uppps, sorry :)", "Maybe next time!"];
    return possibleAnswers[Math.floor(Math.random() * possibleAnswers.length)];
}

function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
    newColor(computerPick);

    checkRoundWinner(playerPick, computerPick);
    gameOver();
}

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}



function gameOver() {

    if (player.score == 10) {
        gameState = 'playerWins'
        setGameElements();

    }

    if (computer.score == 10) {
        gameState = 'computerWins'
        setGameElements();

    }
}



pickRock.addEventListener('mouseover', function (e) {
    var rockSound = document.getElementById('js-rock-soundEfect').play();


    pickRock.addEventListener('mouseleave', function (e) {
        var rockSound = document.getElementById('js-rock-soundEfect').pause();
    })

});


pickPaper.addEventListener('mouseover', function (e) {
    var paperSound = document.getElementById('js-paper-soundEfect').play();


    pickPaper.addEventListener('mouseleave', function (e) {
        var paperSound = document.getElementById('js-paper-soundEfect').pause();
    })

});



pickScissors.addEventListener('mouseover', function (e) {
    var scissorsSound = document.getElementById('js-scissors-soundEfect');
    scissorsSound.play();

    pickScissors.addEventListener('mouseleave', function (e) {
        var scissorsSound = document.getElementById('js-scissors-soundEfect');
        scissorsSound.pause();
    })

});
