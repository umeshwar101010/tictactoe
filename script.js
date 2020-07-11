const X_ = 'x';
const O_ = 'o';
const X_Light = 'xLight';
const X_Dark = 'xDark';
const O_Light = 'oLight';
const O_Dark = 'oDark';
const winCondition = [
	[ 0, 1, 2 ],
	[ 3, 4, 5 ],
	[ 6, 7, 8 ],
	[ 0, 3, 6 ],
	[ 1, 4, 7 ],
	[ 2, 5, 8 ],
	[ 0, 4, 8 ],
	[ 2, 4, 6 ]
];
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const cells = document.getElementsByClassName('cell');

const winningMessageElement = document.getElementById('winningMessage');

const restartButton = document.getElementById('restartButton');
const winingMessageTextElement = document.querySelector('[data-winning-message-text]');
const currentPlayerTextElement = document.querySelector('[data-currentPlayer]');

let currentTurn = X_;
let currentModeOfX = X_Light;
let currentModeOfO = O_Light;
let draw = true;
startGame();

restartButton.addEventListener('click', startGame);
darkMode.addEventListener('click', changeToDark);
lightMode.addEventListener('click', changeToWhite);

function startGame() {
	currentTurn = X_;
	draw = true;
	cellElements.forEach((cell) => {
		cell.classList.remove(X_);
		cell.classList.remove(X_Light);
		cell.classList.remove(X_Dark);
		cell.classList.remove(O_);
		cell.classList.remove(O_Light);
		cell.classList.remove(O_Dark);
		cell.removeEventListener('click', handleClick);
		cell.addEventListener('click', handleClick, { once: true });
		winningMessageElement.classList.remove('show');
		displayCurrentPlayer(currentTurn);
	});
}

function handleClick(e) {
	//console.log('clicked');
	const cell = e.target;

	markCell(cell);

	if (checkWinner(currentTurn)) {
		//console.log('winner is :' + currentTurn);
		draw = false;
		endGame(draw, currentTurn);
	} else if (isGaveOver()) {
		//console.log('DRAW !');
		draw = true;
		endGame(draw, currentTurn);
	} else {
		//console.log(currentTurn + ' before swap');
		currentTurn = swapTurn(currentTurn);
		displayCurrentPlayer(currentTurn);

		//console.log(currentTurn + ' Please choose one cell');
	}
}

function markCell(cell) {
	cell.classList.add(currentTurn);
	if (currentTurn == X_) {
		cell.classList.add(currentModeOfX);
	}
	if (currentTurn == O_) {
		cell.classList.add(currentModeOfO);
	}
}

function checkWinner(currentTurn) {
	return winCondition.some((condition) => {
		return condition.every((index) => {
			return cellElements[index].classList.contains(currentTurn);
		});
	});
}

function endGame(draw, currentTurn) {
	if (draw) {
		winingMessageTextElement.innerText = 'DRAW !';
	} else {
		winingMessageTextElement.innerText = currentTurn + ' is a winner !';
	}
	winningMessageElement.classList.add('show');
}

function displayCurrentPlayer(currentTurn) {
	currentPlayerTextElement.innerText = 'Current Player : ' + currentTurn;
}

function swapTurn() {
	if (currentTurn === X_) {
		board.classList.remove(X_);
		board.classList.add(O_);
		currentTurn = O_;
	} else {
		board.classList.remove(O_);
		board.classList.add(X_);
		currentTurn = X_;
	}
	return currentTurn;
}

function isGaveOver() {
	return [ ...cellElements ].every((cell) => {
		return cell.classList.contains(X_) || cell.classList.contains(O_);
	});
}

function changeToDark() {
	var body = document.body;

	body.classList.remove('bodyWhite');
	body.classList.add('bodyDark');
	currentPlayerTextElement.classList.remove('playerTurnDisplayLight');
	currentPlayerTextElement.classList.add('playerTurnDisplayDark');

	cellElements.forEach((cell) => {
		if (cell.classList.contains('cellLight')) {
			cell.classList.remove('cellLight');
		}
		cell.classList.add('cellDark');

		if (cell.classList.contains(X_Light)) {
			cell.classList.remove(X_Light);
			cell.classList.add(X_Dark);
		}
		if (cell.classList.contains(O_Light)) {
			cell.classList.remove(O_Light);
			cell.classList.add(O_Dark);
		}
	});
	currentModeOfX = X_Dark;
	currentModeOfO = O_Dark;
}

function changeToWhite() {
	var body = document.body;

	body.classList.remove('bodyDark');
	body.classList.add('bodyWhite');

	currentPlayerTextElement.classList.remove('playerTurnDisplayDark');
	currentPlayerTextElement.classList.add('playerTurnDisplayLight');

	cellElements.forEach((cell) => {
		if (cell.classList.contains('cellDark')) {
			cell.classList.remove('cellDark');
		}
		cell.classList.add('cellLight');

		if (cell.classList.contains(X_Dark)) {
			cell.classList.remove(X_Dark);
			cell.classList.add(X_Light);
		}
		if (cell.classList.contains(O_Dark)) {
			cell.classList.remove(O_Dark);
			cell.classList.add(O_Light);
		}
	});

	currentModeOfX = X_Light;
	currentModeOfO = O_Light;
}
