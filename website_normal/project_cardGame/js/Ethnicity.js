class Ethnicity {
    constructor(strName, path, intAttack, intBlood, intHolyWater) {
        this.intStayOnGround = 0;
        this.strName = strName;
        this.intBlood = intBlood;
        this.intAttack = intAttack;
        this.intHolyWater = intHolyWater;
        this.picturePath = path;
    }
    checkSoldierAttackStatus(cardId) {
        if (this.intStayOnGround > 0)
            document.getElementById(cardId).classList.add("canAttack");
        FightSystem.mapPlayerCards[cardId].strStatus = "canAttack";
    }
    renewCharacterBloodAttack(cardId, loseBlood) {
        document.getElementById(cardId).childNodes[3].firstChild.nodeValue = this.intBlood + "";
        document.getElementById(cardId).childNodes[5].firstChild.nodeValue = this.intAttack + "";
    }
    decideIsDie(cardId, player) {
        if (this.intBlood <= 0) {
            if (player === "attack")
                this.checkWhoIsDie(Player.playerAttacker.arrSoldierOnGround);
            else
                this.checkWhoIsDie(Player.playerDefender.arrSoldierOnGround);
            document.getElementById(cardId).parentElement.removeChild(document.getElementById(cardId));
            return true;
        }
        return false;
    }
    checkWhoIsDie(arrSoldierOnGround) {
        for (let index = 0; index < arrSoldierOnGround.length; index++) {
            let intBlood = arrSoldierOnGround[index].intBlood;
            if (intBlood <= 0) {
                arrSoldierOnGround.splice(index, 1);
                index--;
            }
        }
    }
}
