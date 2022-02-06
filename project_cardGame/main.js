var player1 = new Player('player1');
var player2 = new Player('player2');

let playerClickCard = null;

function start() {
	document.getElementById('startGame').style.display = 'none';
	document.getElementById('chooseCard').style.display = 'flex';


	new PlayerCard(new warrior('Skeleton', './img/Skeleton.jpg', 1, 1, 1), 35, 31, true, 'chooseCard');
	new PlayerCard(new warrior('Vakiri', './img/Vakiri.jpg', 3, 4, 4), 50, 31, true, 'chooseCard');
	new PlayerCard(new Archer('Shooter', './img/shooter.jpg', 2, 2, 3), 65, 31, true, 'chooseCard');
	new PlayerCard(new Archer('FireShooter', './img/fireShooter.jpg', 3, 3, 4), 35, 61, true, 'chooseCard');
	new PlayerCard(new Tank('IceMan', './img/iceMan.jpg', 1, 4, 2), 50, 61, true, 'chooseCard');
	new PlayerCard(new Tank('FatMan', './img/fatMan.jpg', 2, 6, 5), 65, 61, true, 'chooseCard');

	for (let index = 0; index < StaticVar.intObjectCount; index++) {
		let tagPlayCard = document.getElementById('playerCard' + index);
		tagPlayCard.onclick = createPlayerCardDecks;
	}
}


function createPlayerCardDecks() {
	let player;
	let focusPlayer = document.getElementById('chooseCard').childNodes[1].innerHTML;
	if (focusPlayer === 'Player 1') player = player1;
	else if (focusPlayer === 'Player 2') player = player2;


	if (StaticVar.mapPlayerCards[this.id].isBorderShow) player.arrCardDeck.push(StaticVar.mapPlayerCards[this.id]);
	else {
		let intCardDeckLength = player.arrCardDeck.length;
		for (let index = 0; index < intCardDeckLength; index++) {
			if (player.arrCardDeck[index] === StaticVar.mapPlayerCards[this.id]) {
				StaticVar.mapPlayerCards[this.id].isBorderShow = StaticVar.mapPlayerCards[this.id].showOrNOBorder(this.id, false);
				player.arrCardDeck.splice(index, 1);
				break;
			}
		}
	}

	console.log(player.arrCardDeck);

	
	while (player.arrCardDeck.length >= 4) {
		player.arrCardDeck[0].isBorderShow = player.arrCardDeck[0].showOrNOBorder(player.arrCardDeck[0].strId, false);
		player.arrCardDeck.splice(0, 1);
	}
}


function changePlayerToChooseCard() {
	if (player1.arrCardDeck.length < 3) {
		alert('You need more hand card!!');
		return;
	}

	let chooseCardChild = document.getElementById('chooseCard');
	chooseCardChild.childNodes[1].innerHTML = 'Player 2';
	chooseCardChild.childNodes[3].value = 'Game Start';
	chooseCardChild.childNodes[3].onclick = startGame;
	for (let element in StaticVar.mapPlayerCards) {
		StaticVar.mapPlayerCards[element].isBorderShow = false;
		document.getElementById(StaticVar.mapPlayerCards[element].strId).style.border = '';
	}
}


function startGame() {
	if (player2.arrCardDeck.length < 3) {
		alert('You need more hand card!!!!');
		return;
	}

	alert('Game Start');
	StaticVar.isGameStart = true;
	document.getElementById('chooseCard').style.display = 'none';

	for (let index = 0; index < 3; index++) {
		createPlayerHandCard(player1, index);
		createPlayerHandCard(player2, index);
	}

	fightProcess(player1, true);
}


function createPlayerHandCard(player, index) {
	let intRandomNum = Math.floor(Math.random() * 3);
	switch (player.arrCardDeck[intRandomNum].character.strName) {
		case 'Skeleton':
			player.arrHandCard.splice(index, 0, new warrior('Skeleton', './img/Skeleton.jpg', 1, 1, 1));
			break;
		case 'Vakiri':
			player.arrHandCard.splice(index, 0, new warrior('Vakiri', './img/Vakiri.jpg', 3, 4, 4));
			break;
		case 'Shooter':
			player.arrHandCard.splice(index, 0, new Archer('Shooter', './img/shooter.jpg', 2, 2, 3));
			break;
		case 'FireShooter':
			player.arrHandCard.splice(index, 0, new Archer('FireShooter', './img/fireShooter.jpg', 3, 3, 4));
			break;
		case 'IceMan':
			player.arrHandCard.splice(index, 0, new Tank('IceMan', './img/iceMan.jpg', 1, 4, 2));
			break;
		case 'FatMan':
			player.arrHandCard.splice(index, 0, new Tank('FatMan', './img/fatMan.jpg', 2, 6, 5));
			break;
	}
}


function fightProcess(player, initial) {
	createPlayerFightingCard(player);


	StaticVar.playerAttacker = player;
	if (player.strName === 'player1') StaticVar.playerDefender = player2;
	else StaticVar.playerDefender = player1;


	if (initial) {
		document.addEventListener('mousedown', fightMouseDown);
		document.addEventListener('mousemove', fightMouseMove);
		document.addEventListener('mouseup', fightMouseUp);
	}
}


function createPlayerFightingCard(player) {
	new PlayerCard(player.arrHandCard[0], 38, 97, false, 'fightingMainBlock');
	new PlayerCard(player.arrHandCard[1], 50, 97, false, 'fightingMainBlock');
	new PlayerCard(player.arrHandCard[2], 62, 97, false, 'fightingMainBlock');

	let length = player.arrSoldierOnGround.length;
	for (let indexOnGround = 0; indexOnGround < length; indexOnGround++) {
		let newCard = new PlayerCard(player.arrSoldierOnGround[indexOnGround], '', '', false, 'ourSide');
		changeUnsetToReady(newCard, document.getElementById(newCard.strId));

		player.arrSoldierOnGround[indexOnGround].intStayOnGround++;
		player.arrSoldierOnGround[indexOnGround].checkSoldierAttackStatus(newCard.strId);
	}
}


function fightMouseDown(event) {
	if (event.target.parentElement === null || event.target.parentElement.className.indexOf('playerCard') === -1) {
		if (playerClickCard) playerClickCard.isBorderShow = playerClickCard.showOrNOBorder(playerClickCard.strId, false);
		document.getElementById('putCardPoint').style.display = 'none';
		playerClickCard = null;
		return;
	}


	if (playerClickCard !== null && playerClickCard !== StaticVar.objPlayCardFocus) {
		playerClickCard.isBorderShow = playerClickCard.showOrNOBorder(playerClickCard.strId, false);
		playerClickCard = null;
	}


	playerClickCard = StaticVar.objPlayCardFocus;
	playerClickCard.isBorderShow = playerClickCard.showOrNOBorder(playerClickCard.strId, true);


	if (playerClickCard.strStatus === 'unset') document.getElementById('putCardPoint').style.display = 'block';


	if (StaticVar.objPlayCardFocus.strStatus === "canAttack"){
		StaticVar.objAttacker = StaticVar.objPlayCardFocus;
		document.getElementById("attackSword").style.display = "block";
		setAttackSwordPosition(event);
	}
}

function fightMouseMove(event) {
	if (StaticVar.objPlayCardFocus !== null && StaticVar.objPlayCardFocus.strStatus === "canAttack") {
		setAttackSwordPosition(event);
	}
}

function setAttackSwordPosition(event) {
	document.getElementById("attackSword").style.left = event.pageX + 1.5 + "px";
	document.getElementById("attackSword").style.top = event.pageY + 1.5 + "px";
}


function fightMouseUp(event) {
	let isMovingSuccess;
	isMovingSuccess = StaticVar.checkIfOutSafeSide(event);

	if (StaticVar.playerAttacker.arrSoldierOnGround.length >= 7 && StaticVar.objPlayCardFocus.strStatus === 'unset')
		StaticVar.objPlayCardFocus.resetPlayCard();
	else if (isMovingSuccess) putPlayCardOnGround();
}


function putPlayCardOnGround() {
	let cardNumber;
	let intPercentWidth = (StaticVar.arrIntOriginSite[0] / document.getElementById('fightingMainBlock').offsetWidth) * 100;

	if (intPercentWidth <= 42) cardNumber = 0;
	else if (intPercentWidth <= 55) cardNumber = 1;
	else cardNumber = 2;

	changeUnsetToReady(StaticVar.objPlayCardFocus, StaticVar.tagPlayCardFocus);

	document.getElementById('fightingMainBlock').innerHTML.replace(StaticVar.tagPlayCardFocus, '');
	document.getElementById('ourSide').appendChild(StaticVar.tagPlayCardFocus);
	document.getElementById('putCardPoint').style.display = 'none';

	StaticVar.playerAttacker.arrSoldierOnGround.push(StaticVar.playerAttacker.arrHandCard[cardNumber]);

	StaticVar.playerAttacker.arrHandCard.splice(cardNumber, 1);
	createPlayerHandCard(StaticVar.playerAttacker, cardNumber);

	new PlayerCard(StaticVar.playerAttacker.arrHandCard[cardNumber], intPercentWidth, 97, false, 'fightingMainBlock');
}

function changeUnsetToReady(objPlayerCard, tagPlayerCard) {
	objPlayerCard.strStatus = 'ready';
	tagPlayerCard.classList.add('playerCardOnGround');
	tagPlayerCard.style.transform = '';
	tagPlayerCard.style.left = '';
	tagPlayerCard.style.top = '';
}




function changePlayerTurn() {
	if (StaticVar.isGameStart) {
		let oldCard = document.getElementById('fightingMainBlock').lastChild;
		while (oldCard.className === 'playerCard') {
			document.getElementById('fightingMainBlock').removeChild(oldCard);
			oldCard = document.getElementById('fightingMainBlock').lastChild;
		}


		let ourSideSoldierOnGround = document.getElementById('ourSide');
		for (let index = 0; index < ourSideSoldierOnGround.childNodes.length; index++) {
			StaticVar.mapPlayerCards[ourSideSoldierOnGround.childNodes[index].id].strStatus = 'defender';
			ourSideSoldierOnGround.childNodes[index].classList.add('defender');
		}


		ourSideSoldierOnGround.innerHTML = ourSideSoldierOnGround.innerHTML.replaceAll('canAttack', '');
		document.getElementById('enemySide').innerHTML = ourSideSoldierOnGround.innerHTML;
		document.getElementById('ourSide').innerHTML = '';


		let attacker = document.getElementById('playerAttacker');
		let defender = document.getElementById('playerDefender');
		attacker.classList.add('defender');
		defender.classList.remove('defender');
		attacker.id = 'playerDefender';
		defender.id = 'playerAttacker';


		if (StaticVar.playerAttacker.strName === 'player1') fightProcess(player2, false);
		else fightProcess(player1, false);
	}
}