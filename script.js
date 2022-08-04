//variables used throughout the game
let playerScore = 0;
let computerScore = 0;
let roundWinner = '';

//function to generate computer's choice
function getComputerChoice() {
    let result = Math.floor(Math.random() * 3);

    switch (result) {
        case 0:
            return 'Rock';
        case 1:
            return 'Paper';
        case 2:
            return 'Scissors';
    }
}

//function to compare the player's and computer's choice
function playRound(playerSelection, computerSelection) {
    player = playerSelection.toLowerCase();
    computer = computerSelection.toLowerCase();

    if (player === computer) {
        roundWinner = 'tie';
    }
    else if (
        (player === 'rock' && computer == 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')) {
        playerScore++;
        roundWinner = 'player';
    }
    else if (
        (computer === 'rock' && player === 'scissors') ||
        (computer === 'paper' && player === 'rock') ||
        (computer === 'scissors' && player === 'paper')) {
        computerScore++;
        roundWinner = 'computer';
    }

    updateScoreMessage(roundWinner, player, computer);
}

//determines whether or not the game has come to an end 
function isGameOver() {
    return (playerScore === 5 || computerScore === 5);
}

//UI 
//keeping track of the scores and selection of both computer and player
const scoreInfo = document.getElementById('scoreInfo');
const scoreMsg = document.getElementById('scoreMsg');
const playerScoreTracker = document.getElementById('playerScore');
const computerScoreTracker = document.getElementById('computerScore');
const playerSign = document.getElementById('playerSign');
const computerSign = document.getElementById('computerSign');
//buttons for playerSelection (rock, paper, or scissors)
const rock = document.getElementById('rockbtn');
const paper = document.getElementById('paperbtn');
const scissors = document.getElementById('scissorsbtn');
//end modal
const endgameModal = document.getElementById('endgameModal');
const endgameMsg = document.getElementById('endagemMsg');
const restart = document.getElementById('restartBtn');

//buttons for user to select his/her choice
rock.addEventListener('click', () => {
    clickFromUser('rock');
});
paper.addEventListener('click', () => {
    clickFromUser('paper');
});
scissors.addEventListener('click', () => {
    clickFromUser('scissors');
});
//restart button
restart.addEventListener('click', () => {
    restartGame();
});

//when user clicks on one of rock, paper, scissors button
function clickFromUser(playerSelection) {
    if (isGameOver()) 
    {
        openEndgameModal();
        return;
    }

    const computerSelection = getComputerChoice();
    playRound(playerSelection, computerSelection);
    updateSigns(player, computer);
    updateScore();

    if (isGameOver()) 
    {
        openEndgameModal();
        displayFinalMessage();
    }
}

//displays the player's and computer's choices on the screen during the game
function updateSigns(playerSelection, computerSelection) {
    switch(playerSelection) {
        case 'rock':
            playerSign.textContent = '✊';
            break;
        case 'paper':
            playerSign.textContent = '✋';
            break;
        case 'scissors':
            playerSign.textContent = '✌';
            break;
    }

    switch(computerSelection) {
        case 'rock':
            computerSign.textContent = '✊';
            break;
        case 'paper':
            computerSign.textContent = '✋';
            break;
        case 'scissors':
            computerSign.textContent = '✌';
            break;
    }
}

//updates the player's and computer's score throughout the game (as well as displays message depending on the user's choice)
function updateScore() {

    if (roundWinner === 'tie') {
        scoreInfo.textContent = "It is a tie!";
    }
    else if (roundWinner === 'player') {
        scoreInfo.textContent = "You won!";
    }
    else if (roundWinner === 'computer') {
        scoreInfo.textContent = "You lost!"
    }

    playerScoreTracker.textContent = `Player: ${playerScore}`;
    computerScoreTracker.textContent = `Computer: ${computerScore}`;
}

//displays user's and computer's choices with message saying which sign beats or is beaten by what
function updateScoreMessage(winner, player, computer) {
    if (winner === 'player') {
        scoreMsg.textContent = `${capitalizeFirstLetter(player)} beats ${computer}`;
        return;
    }
    else if (winner === 'computer') {
        scoreMsg.textContent = `${capitalizeFirstLetter(player)} is beaten by ${computer}`;
        return;
    }
    else if (winner === 'tie') {
        scoreMsg.textContent = `${capitalizeFirstLetter(player)} ties with ${computer}`;
        return;
    }

}

//capitalizing a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function openEndgameModal() {
    endgameModal.classList.add('active');
    
}

function closeEndgameModal() {
    endgameModal.classList.remove('active');
}

function displayFinalMessage() {
    return (playerScore > computerScore ? (endgameMsg.textContent = 'You won!') : (endgameMsg.textContent = 'You lost...'));
}

//resets the scores to 0 and messages to default
function restartGame() {
    playerScore = 0;
    computerScore = 0;
    scoreInfo.textContent = 'Make your choice';
    scoreMsg.textContent = 'First to score 5 points wins the game'; 
    playerScoreTracker.textContent = `Player: ${playerScore}`;
    computerScoreTracker.textContent = `Computer: ${computerScore}`;
    endgameModal.classList.remove('active');
}