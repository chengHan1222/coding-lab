class FightSystem {
    static startToChooseCard() {
        document.getElementById('startGame').style.display = 'none';
        document.getElementById('chooseCard').style.display = 'flex';
        new PlayerCard(new warrior('Skeleton', './img/Skeleton.jpg', 1, 1, 1), 35, 31, true, 'chooseCard');
        new PlayerCard(new warrior('Vakiri', './img/Vakiri.jpg', 3, 4, 4), 50, 31, true, 'chooseCard');
        new PlayerCard(new Archer('Shooter', './img/shooter.jpg', 2, 2, 3), 65, 31, true, 'chooseCard');
        new PlayerCard(new Archer('FireShooter', './img/fireShooter.jpg', 3, 3, 4), 35, 61, true, 'chooseCard');
        new PlayerCard(new Tank('IceMan', './img/iceMan.jpg', 1, 4, 2), 50, 61, true, 'chooseCard');
        new PlayerCard(new Tank('FatMan', './img/fatMan.jpg', 2, 6, 5), 65, 61, true, 'chooseCard');
        player1.createPlayerCardDecks();
    }
    static changePlayerToChooseCard() {
        if (!player1.checkIfHaveEnoughCard())
            return;
        FightSystem.renewHTMLValue();
        player2.createPlayerCardDecks();
    }
    static renewHTMLValue() {
        let divChooseCard = document.getElementById('chooseCard');
        divChooseCard.children[1].setAttribute("value", "Game Start");
        divChooseCard.children[1].removeAttribute("onclick");
        divChooseCard.children[1].setAttribute("onclick", "startGame()");
    }
    static gameInitial() {
        if (!player2.checkIfHaveEnoughCard())
            return;
        alert('Game Start');
        FightSystem.isGameStart = true;
        document.getElementById('chooseCard').style.display = 'none';
        for (let index = 0; index < 3; index++) {
            player1.createPlayerHandCards(index);
            player2.createPlayerHandCards(index);
        }
        document.addEventListener("mousedown", PlayerCard.cardMouseDown);
        document.addEventListener("mousemove", PlayerCard.cardMouseMove);
        document.addEventListener('mouseup', PlayerCard.cardMouseUp);
        this.startFight(player1);
    }
    static startFight(player) {
        player.displayPlayerFightingCards();
        Player.playerAttacker = player;
        if (player.strName === 'Player 1')
            Player.playerDefender = player2;
        else
            Player.playerDefender = player1;
    }
    static putPlayerCardOnGround() {
        let cardNumber;
        let intPercentWidth = (FightSystem.arrIntOriginSite[0] / document.getElementById('fightingMainBlock').offsetWidth) * 100;
        if (intPercentWidth <= 42)
            cardNumber = 0;
        else if (intPercentWidth <= 55)
            cardNumber = 1;
        else
            cardNumber = 2;
        FightSystem.objPlayCardFocus.changeUnsetToReady();
        document.getElementById('fightingMainBlock').innerHTML.replace(FightSystem.tagPlayCardFocus.textContent, '');
        document.getElementById('ourSide').appendChild(FightSystem.tagPlayCardFocus);
        document.getElementById('putCardArea').style.display = 'none';
        Player.playerAttacker.arrSoldierOnGround.push(Player.playerAttacker.arrHandCard[cardNumber]);
        Player.playerAttacker.arrHandCard.splice(cardNumber, 1);
        Player.playerAttacker.createPlayerHandCards(cardNumber);
        new PlayerCard(Player.playerAttacker.arrHandCard[cardNumber], intPercentWidth, 97, false, 'fightingMainBlock');
    }
    static checkIfOutSafeSide(event) {
        if (event.target.parentElement === null)
            return true;
        if (event.target.parentElement.className.indexOf('playerCard') === -1 ||
            this.mapPlayerCards[event.target.parentElement.id].strStatus !== "unset")
            return false;
        if (event.pageX <= this.mapSafeSideRange["divLeft"] || event.pageX >= this.mapSafeSideRange["divLeft_Width"] ||
            event.pageY >= this.mapSafeSideRange["divTop_Height"]) {
            this.objPlayCardFocus.resetPlayerCard();
            return false;
        }
        return true;
    }
}
FightSystem.isGameStart = false;
FightSystem.isPlayCardMove = false;
FightSystem.objPlayCardFocus = null;
FightSystem.tagPlayCardFocus = null;
FightSystem.objAttacker = null;
FightSystem.objDefender = null;
FightSystem.mapPlayerCards = {};
FightSystem.mapSafeSideRange = {};
FightSystem.arrIntPointSite = [];
FightSystem.arrIntOriginSite = [];
