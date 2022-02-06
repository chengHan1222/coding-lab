class Player {

    strName: string;
    arrCardDeck: Array<PlayerCard> = [];
    arrHandCard: Array<Ethnicity> = [];
    arrSoldierOnGround: Array<Ethnicity> = [];
    intBlood: number = 30;

    static playerAttacker: Player = new Player('Player 1');
    static playerDefender: Player = new Player('Player 2');

    constructor(strName: string) {
        this.strName = strName;
    }


    public createPlayerCardDecks(): void{
        let chooseCardChild = document.getElementById('chooseCard');
        chooseCardChild.children[0].firstChild.nodeValue = this.strName;
        let i = 1;
        for (let element in FightSystem.mapPlayerCards) {
            FightSystem.mapPlayerCards[element].isBorderShow =
            FightSystem.mapPlayerCards[element].showOrNOBorder(FightSystem.mapPlayerCards[element].strId, false);
            
            let tagPlayCard = document.getElementById(FightSystem.mapPlayerCards[element].strId);
            tagPlayCard.onclick = () => this.addCardToDeck(tagPlayCard.id);
        }
    }

    public addCardToDeck(strId: string): void {
        if (!FightSystem.mapPlayerCards[strId].isBorderShow){
            this.arrCardDeck.push(FightSystem.mapPlayerCards[strId]);
            FightSystem.mapPlayerCards[strId].isBorderShow = FightSystem.mapPlayerCards[strId].showOrNOBorder(strId, true);
        }

        else {
            let intCardDeckLength = this.arrCardDeck.length;
            for (let index = 0; index < intCardDeckLength; index++) {
                if (this.arrCardDeck[index] === FightSystem.mapPlayerCards[strId]) {
                    FightSystem.mapPlayerCards[strId].isBorderShow = FightSystem.mapPlayerCards[strId].showOrNOBorder(strId, false);
                    this.arrCardDeck.splice(index, 1);
                    break;
                }
            }
        }

        
        while (this.arrCardDeck.length >= 4) {
            this.arrCardDeck[0].isBorderShow = this.arrCardDeck[0].showOrNOBorder(this.arrCardDeck[0].strId, false);
            this.arrCardDeck.splice(0, 1);
        }
    }

    public createPlayerHandCards(index: number): void {
        let intRandomNum = Math.floor(Math.random() * 3);
        switch (this.arrCardDeck[intRandomNum].character.strName) {
            case 'Skeleton':
                this.arrHandCard.splice(index, 0, new warrior('Skeleton', './img/Skeleton.jpg', 1, 1, 1));
                break;
            case 'Vakiri':
                this.arrHandCard.splice(index, 0, new warrior('Vakiri', './img/Vakiri.jpg', 3, 4, 4));
                break;
            case 'Shooter':
                this.arrHandCard.splice(index, 0, new Archer('Shooter', './img/shooter.jpg', 2, 2, 3));
                break;
            case 'FireShooter':
                this.arrHandCard.splice(index, 0, new Archer('FireShooter', './img/fireShooter.jpg', 3, 3, 4));
                break;
            case 'IceMan':
                this.arrHandCard.splice(index, 0, new Tank('IceMan', './img/iceMan.jpg', 1, 4, 2));
                break;
            case 'FatMan':
                this.arrHandCard.splice(index, 0, new Tank('FatMan', './img/fatMan.jpg', 2, 6, 5));
                break;
        }
    }

    public displayPlayerFightingCards(): void {
        new PlayerCard(this.arrHandCard[0], 38, 97, false, 'fightingMainBlock');
        new PlayerCard(this.arrHandCard[1], 50, 97, false, 'fightingMainBlock');
        new PlayerCard(this.arrHandCard[2], 62, 97, false, 'fightingMainBlock');
    
        let length = this.arrSoldierOnGround.length;
        for (let indexOnGround = 0; indexOnGround < length; indexOnGround++) {
            let newCard = new PlayerCard(this.arrSoldierOnGround[indexOnGround], undefined, undefined, false, 'ourSide');
            newCard.changeUnsetToReady();
    
            this.arrSoldierOnGround[indexOnGround].intStayOnGround++;
            this.arrSoldierOnGround[indexOnGround].checkSoldierAttackStatus(newCard.strId);
        }
    }


    public changePlayerTurn(): void {
        let oldCard = document.getElementById('fightingMainBlock').lastElementChild;
        while (oldCard.className === "playerCard") {
            document.getElementById('fightingMainBlock').removeChild(oldCard);
            oldCard = document.getElementById('fightingMainBlock').lastElementChild;
        }

        Player.exchangeOffensiveAndDefensive();

        Player.changePlayerHTML();


        if (Player.playerAttacker.strName === 'Player 1') FightSystem.startFight(player2);
        else FightSystem.startFight(player1);
    }
    private static exchangeOffensiveAndDefensive(): void {
        let ourSideSoldierOnGround = document.getElementById('ourSide');
        for (let index = 0; index < ourSideSoldierOnGround.childNodes.length; index++) {
            FightSystem.mapPlayerCards[ourSideSoldierOnGround.children[index].id].strStatus = 'ready';
            ourSideSoldierOnGround.children[index].classList.add('defender');
        }

        ourSideSoldierOnGround.innerHTML = Player.TsDontHaveReplaceAll(ourSideSoldierOnGround.innerHTML, "canAttack", "");
        document.getElementById('enemySide').innerHTML = ourSideSoldierOnGround.innerHTML;
        document.getElementById('ourSide').innerHTML = '';
    }

    private static TsDontHaveReplaceAll(getString: string, selectString: string, replaceString: string): string {
        while (getString.indexOf(selectString) !== -1){
            getString.replace(selectString, replaceString);
        }
        return getString;
    }

    private static changePlayerHTML(): void {
        let attacker = document.getElementById('playerAttacker');
        let defender = document.getElementById('playerDefender');
        attacker.classList.add('defender');
        defender.classList.remove('defender');
        attacker.id = 'playerDefender';
        defender.id = 'playerAttacker';
    }


    public checkIfHaveEnoughCard(): boolean {
        if (this.arrCardDeck.length < 3) {
            alert('You need more hand card!!');
            return false;
        }
        return true;
    }


    public decideIsDie(): void {
        if (this.intBlood <= 0) {
            alert("GameOver");
            alert(this.strName + " Win!!!");
            alert("Thank for playing");
            location.reload();
        }
    }
}