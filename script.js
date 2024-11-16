// 1. A input from user
// 2. A function that returns randomly a string of value rock, paper or scissors
// 3. A function that checks if the user in put is either rock, paper or scissors
// 4. The program should keep track of user and computer score
// 5. A function that play a single round.
// 5.1 the function should take humanChoice and computerChoice as arguments and compare them
// 5.2 write logic paper beats rock, rock beats scissors and scissors beats paper
// 5.3 return the message with winner and increment the score for the winner
// 6 a game function to play n number of rounds. number of rounds will be a parameter for the game function

let numberOfRounds = parseInt(prompt("How many rounds do you want to play?"));

let userScore = 0;
let computerScore = 0;

function getComputerChoice() {
	let randomNumber = Math.floor(Math.random() * 3) + 1;
	let choice;

	switch (randomNumber) {
		case 1:
			choice = "rock";
			break;
		case 2:
			choice = "paper";
			break;
		case 3:
			choice = "scissors";
			break;
	}

	return choice;
}

function getHumanChoice(userAnswer) {
	if (
		userAnswer.toLowerCase() !== "rock" &&
		userAnswer.toLowerCase() !== "paper" &&
		userAnswer.toLowerCase() !== "scissors"
	) {
		alert(
			`your answer: ${userAnswer.toLowerCase()}. should be either rock, paper or scissors`
		);
		return null;
	}
	return userAnswer.toLowerCase();
}

function handleScore(userPoints, computerPoints) {
	console.log(`SCORE => User: ${userPoints} | Computer: ${computerPoints}`);
}

function playGame() {
	const userAnswer = prompt("Rock, Paper or Scissors?");

	const humanSelection = getHumanChoice(userAnswer);
	const computerSelection = getComputerChoice();

	function playRound(humanChoice, computerChoice) {
		let message = "";
		if (humanChoice === computerChoice) {
			return `it is a draw! Both choose ${humanChoice}. Play again!`;
		}

		switch (humanChoice) {
			case "paper":
				if (computerChoice === "rock") {
					message = "You Won! Paper beats rock!";
					userScore++;
				} else {
					message = "You lost! Scissors beats paper!";
					computerScore++;
				}
				break;
			case "rock":
				if (computerChoice === "scissors") {
					message = "You Won! rock beats scissors!";
					userScore++;
				} else {
					message = "You lost! Paper beats rock!";
					computerScore++;
				}
				break;
			case "scissors":
				if (computerChoice === "paper") {
					message = "You Won! scissors beats paper!";
					userScore++;
				} else {
					message = "You lost! Rock beats scissors!";
					computerScore++;
				}
				break;
		}

		handleScore(userScore, computerScore);

		return message;
	}

	let roundResult = playRound(humanSelection, computerSelection);

	console.log(roundResult);
}

for (let i = 1; i <= numberOfRounds; i++) {
	playGame();
}