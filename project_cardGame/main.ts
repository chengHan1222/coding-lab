let player1: Player = new Player('Player 1');
let player2: Player = new Player('Player 2');

let playerClickCard: PlayerCard = null;

function play() {
	FightSystem.startToChooseCard();
}

function changePlayerToChooseCard() {
	FightSystem.changePlayerToChooseCard();
}

function startGame() {
	FightSystem.gameInitial();
}


function changePlayerTurn() {
	if (FightSystem.isGameStart) Player.playerAttacker.changePlayerTurn();
}
