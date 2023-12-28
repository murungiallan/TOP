const buttons = document.querySelectorAll('button');
const pickSelection = document.querySelector('.pick-selection');
const result = document.querySelector('.result');
const count = document.querySelector('.game-count');

let playerScore = 0;
let computerScore = 0;
let gameCount = 0;

function getComputerChoice(){
    const game_array = ["rock", "paper", "scissors"];

    random_item = Math.floor(Math.random() * game_array.length)
    return game_array[random_item]
}

function playRound(player_selection, computerSelection){
    if (player_selection === "rock" && computerSelection === "paper") {
        computerScore++;
        return "You Lose! paper beats rock";
    } else if (player_selection === "rock" && computerSelection === "scissors") {
        playerScore++;
        return "You Win! rock beats scissors";
    } else if (player_selection === "scissors" && computerSelection === "paper") {
        playerScore++;
        return "You Win! scissors beats paper";
    } else if (player_selection === "paper" && computerSelection === "rock") {
        playerScore++;
        return "You Win! paper beats rock";
    } else if (player_selection === "scissors" && computerSelection === "rock") {
        computerScore++;
        return "You Lose! rock beats scissors";
    } else if (player_selection === "paper" && computerSelection === "scissors") {
        computerScore++;
        return "You Lose! scissors beats paper";
    } else {
        return "It's a draw."
    }
}

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        gameCount++;
        /*if (gameCount === 5) {
            result.textContent = "GAME OVER";
            buttons.disabled = true;
        }*/
        count.textContent = `Game count: ${gameCount}`;
        result.textContent = playRound(button.id, getComputerChoice());
    });
});