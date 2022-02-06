class warrior extends Ethnicity{

    constructor(strName: string, path: string, intAttack: number, intBlood: number, intHolyWater: number){

        super(strName, path, intAttack, intBlood, intHolyWater);

    }

    public checkSoldierAttackStatus(cardId: string): void {
        super.checkSoldierAttackStatus(cardId);

        if (this.intStayOnGround > 0) {
            this.intBlood += 1;
            this.intAttack += 1;
            
            super.renewCharacterBloodAttack(cardId, 0);
        }
    }
}