class Ethnicity{

    strName: string;
    intBlood: number;
    intAttack: number;
    intHolyWater: number;
    picturePath: string;
    intStayOnGround: number = 0;
    
    constructor(strName: string, path: string, intAttack: number, intBlood: number, intHolyWater: number){

        this.strName = strName;
        this.intBlood = intBlood;
        this.intAttack = intAttack;
        this.intHolyWater = intHolyWater;
        this.picturePath = path;
    }
    
    public checkSoldierAttackStatus (cardId: string): void {
        if (this.intStayOnGround > 0) document.getElementById(cardId).classList.add("canAttack");

        FightSystem.mapPlayerCards[cardId].strStatus = "canAttack";
    }

    public renewCharacterBloodAttack (cardId: string, loseBlood: number): void {
        document.getElementById(cardId).childNodes[3].firstChild.nodeValue  = this.intBlood + "";
        document.getElementById(cardId).childNodes[5].firstChild.nodeValue = this.intAttack + "";
    }

    public decideIsDie(cardId: string, player): boolean {
        if (this.intBlood <= 0) {
            if (player === "attack") this.checkWhoIsDie(Player.playerAttacker.arrSoldierOnGround);
            else this.checkWhoIsDie(Player.playerDefender.arrSoldierOnGround);

            document.getElementById(cardId).parentElement.removeChild(document.getElementById(cardId));
            return true;
        }
        return false;
    }

    private checkWhoIsDie(arrSoldierOnGround: Array<Ethnicity>): void {
        for (let index = 0; index < arrSoldierOnGround.length; index++) {
            let intBlood = arrSoldierOnGround[index].intBlood;
            if (intBlood <= 0) {
                arrSoldierOnGround.splice(index, 1);
                index--;
            }
        }
    }
}
