class warrior extends Ethnicity {
    constructor(strName, path, intAttack, intBlood, intHolyWater) {
        super(strName, path, intAttack, intBlood, intHolyWater);
    }
    checkSoldierAttackStatus(cardId) {
        super.checkSoldierAttackStatus(cardId);
        if (this.intStayOnGround > 0) {
            this.intBlood += 1;
            this.intAttack += 1;
            super.renewCharacterBloodAttack(cardId, 0);
        }
    }
}
