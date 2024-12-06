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
let isRoundActive = false;

const gameContainer = document.querySelector("#game");
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
	const choice = event.currentTarget.id;
	return choice;
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
	humanLabel.classList.add("text-label");
	computerLabel.classList.add("text-label");
	humanLabel.textContent = "you picked";
	computerLabel.textContent = "the host picked";
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

const handleNextRound = () => {
	const dynamicBlock = document.querySelector("#dynamic-block");
	const gameInfoElement = document.querySelector(".round-info");
	const textLabels = document.querySelectorAll(".text-label");

	gameContainer.removeChild(dynamicBlock);
	gameContainer.removeChild(gameInfoElement);

	itemList.forEach((item) => {
		item.parentElement.removeAttribute("style");
	});

	textLabels.forEach((label) => {
		label.parentElement.removeChild(label);
	});
};

const handleGameWinner = () => {
	const gameInfoElement = document.createElement("div");
	const messageText = document.createElement("h4");
	const button = document.createElement("button");
	const lastChild = document.querySelector("#dynamic-block");

	if (userScore === 5 || hostScore === 5) {
		messageText.textContent =
			userScore === 5 ? "user wins the game" : "computer wins the game";
		button.textContent = "play another game";
		button.addEventListener("click", () => {
			window.location.reload();
		});
	} else {
		button.textContent = "play again";
		messageText.textContent = roundMessage;
	}

	gameInfoElement.classList.add("item-block");
	gameInfoElement.classList.add("round-info");
	gameInfoElement.appendChild(messageText);
	gameInfoElement.appendChild(button);
	gameContainer.insertBefore(gameInfoElement, lastChild);

	button.addEventListener("click", () => {
		handleNextRound();
		isRoundActive = false;
	});
};

const playRound = (humanSelection, computerSelection) => {
	const TIME_IN_MILLISECONDS = 500;

	isRoundActive = true;

	handleHumanSelection(humanSelection);
	setTimeout(() => {
		handleComputerSelection(computerSelection);
		handleRoundWinner(humanSelection, computerSelection);
		handleGameWinner();
	}, TIME_IN_MILLISECONDS);
};

const playGame = () => {
	itemList.forEach((item) => {
		item.addEventListener("click", function (e) {
			if (isRoundActive) return;

			const humanSelection = getHumanChoice(e);
			const computerSelection = getComputerChoice();
			playRound(humanSelection, computerSelection);
		});
	});
};

playGame();
