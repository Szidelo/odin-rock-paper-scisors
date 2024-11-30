// 1. A input from user
// 2. A function that returns randomly a string of value rock, paper or scissors
// 3. A function that checks if the user in put is either rock, paper or scissors
// 4. The program should keep track of user and computer score
// 5. A function that play a single round.
// 5.1 the function should take humanChoice and computerChoice as arguments and compare them
// 5.2 write logic paper beats rock, rock beats scissors and scissors beats paper
// 5.3 return the message with winner and increment the score for the winner
// 6 a game function to play n number of rounds. number of rounds will be a parameter for the game function

// let numberOfRounds = parseInt(prompt("How many rounds do you want to play?"));

const GAME_SELECTIONS = {
	ROCK: "rock",
	PAPER: "paper",
	SCISSORS: "scissors",
};

const ROUND_MESSAGES = {
	WIN: "you win",
	LOSE: "you lose",
	DRAW: "it's a draw",
};

let userScore = 0;
let hostScore = 0;
let roundMessage = "";

const gameContainer = document.querySelector("#game");
const paper = document.querySelector("#paper");
const scissors = document.querySelector("#scissors");
const rock = document.querySelector("#rock");
const itemList = document.querySelectorAll(".item");
const userScoreElement = document.querySelector("#user-score");
const hostScoreElement = document.querySelector("#host-score");

const getComputerChoice = () => {
	const { ROCK, PAPER, SCISSORS } = GAME_SELECTIONS;
	let randomNumber = Math.floor(Math.random() * 3) + 1;
	let choice;

	switch (randomNumber) {
		case 1:
			choice = ROCK;
			break;
		case 2:
			choice = PAPER;
			break;
		case 3:
			choice = SCISSORS;
			break;
	}

	return choice;
};

const getHumanChoice = (event) => {
	const answer = event.currentTarget.id;
	return answer;
};

const handleHumanSelection = (selectedItem) => {
	const selectedElement = document.querySelector(`#${selectedItem}`);

	const unselectedItems = Array.from(itemList).filter(
		(item) => item.id !== selectedItem
	);

	unselectedItems.forEach(
		(item) => (item.parentElement.style.display = "none")
	);

	const emptyBlock = document.createElement("div");
	const emptyImage = document.createElement("div");
	emptyImage.classList.add("item-empty");
	emptyBlock.classList.add("item-block");
	emptyBlock.setAttribute("id", "dynamic-block");
	emptyBlock.appendChild(emptyImage);
	gameContainer.appendChild(emptyBlock);

	const humanLabel = document.createElement("h3");
	const computerLabel = document.createElement("h3");
	humanLabel.textContent = "you picked:";
	computerLabel.textContent = "the host picked:";
	selectedElement.parentElement.insertBefore(humanLabel, selectedElement);
	emptyBlock.insertBefore(computerLabel, emptyImage);
};

const handleComputerSelection = (selectedItem) => {
	const computerSelectedElement = document.querySelector(`#${selectedItem}`);
	const cloneImage = computerSelectedElement.cloneNode(true);
	const dynamicBlock = document.querySelector("#dynamic-block");
	const emptyImage = dynamicBlock.lastChild;
	dynamicBlock.removeChild(emptyImage);
	dynamicBlock.appendChild(cloneImage);
};

const handleRoundWinner = (userSelection, computerSelection) => {
	const { ROCK, PAPER, SCISSORS } = GAME_SELECTIONS;
	const { WIN, LOSE, DRAW } = ROUND_MESSAGES;

	if (userSelection === computerSelection) {
		roundMessage = DRAW;
		return;
	}

	switch (userSelection) {
		case ROCK:
			if (computerSelection === PAPER) {
				roundMessage = LOSE;
				hostScore++;
			} else {
				roundMessage = WIN;
				userScore++;
			}
			break;

		case PAPER:
			if (computerSelection === SCISSORS) {
				roundMessage = LOSE;
				hostScore++;
			} else {
				roundMessage = WIN;
				userScore++;
			}
			break;

		case SCISSORS:
			if (computerSelection === ROCK) {
				roundMessage = LOSE;
				hostScore++;
			} else {
				roundMessage = WIN;
				userScore++;
			}
			break;
	}

	userScoreElement.textContent = userScore;
	hostScoreElement.textContent = hostScore;
};

const playRound = (e) => {
	const TIME_IN_MILLISECONDS = 1000;
	const humanSelection = getHumanChoice(e);
	const computerSelection = getComputerChoice();
	console.log("human selection:", humanSelection);
	console.log("computer selection:", computerSelection);

	setTimeout(() => {
		handleHumanSelection(humanSelection);
		setTimeout(() => {
			handleComputerSelection(computerSelection);
			handleRoundWinner(humanSelection, computerSelection);
		}, TIME_IN_MILLISECONDS);
	}, TIME_IN_MILLISECONDS);
};

// function getScore(userPoints, computerPoints) {
// 	console.log(`SCORE => User: ${userPoints} | Computer: ${computerPoints}`);
// }

// function playGame() {
// 	const userAnswer = prompt("Rock, Paper or Scissors?");

// 	const humanSelection = getHumanChoice(userAnswer);
// 	const computerSelection = getComputerChoice();

// 	function playRound(humanChoice, computerChoice) {
// 		let message = "";
// 		if (humanChoice === computerChoice) {
// 			message = `it is a draw! Both choose ${humanChoice}. Play again!`;
// 		}

// switch (humanChoice) {
// 	case "paper":
// 		if (computerChoice === "rock") {
// 			message = "You Won! Paper beats rock!";
// 			userScore++;
// 		} else {
// 			message = "You lost! Scissors beats paper!";
// 			computerScore++;
// 		}
// 		break;
// 	case "rock":
// 		if (computerChoice === "scissors") {
// 			message = "You Won! rock beats scissors!";
// 			userScore++;
// 		} else {
// 			message = "You lost! Paper beats rock!";
// 			computerScore++;
// 		}
// 		break;
// 	case "scissors":
// 		if (computerChoice === "paper") {
// 			message = "You Won! scissors beats paper!";
// 			userScore++;
// 		} else {
// 			message = "You lost! Rock beats scissors!";
// 			computerScore++;
// 		}
// 		break;
// }

// 		getScore(userScore, computerScore);

// 		return message;
// 	}

// 	let roundResult = playRound(humanSelection, computerSelection);

// 	console.log(roundResult);
// }

// function getFinalResult() {
// 	let winner = "";

// 	if (userScore === computerScore) {
// 		console.log(
// 			`It is a draw! Final score => user: ${userScore} | computer: ${computerScore} `
// 		);
// 	}

// 	if (userScore > computerScore) {
// 		winner = "user";
// 	} else if (userScore < computerScore) {
// 		winner = "computer";
// 	}

// 	if (winner) {
// 		console.log(
// 			`The winner is: ${winner} with ${
// 				winner === "user" ? userScore : computerScore
// 			} points.`
// 		);
// 	}
// }

// for (let i = 1; i <= numberOfRounds; i++) {
// 	playGame();

// 	if (i === numberOfRounds) {
// 		getFinalResult();
// 	}
// }

itemList.forEach((item) => {
	item.addEventListener("click", function (e) {
		playRound(e);
	});
});
