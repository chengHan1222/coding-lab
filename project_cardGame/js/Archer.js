class Archer extends Ethnicity {
    constructor(strName, path, intAttack, intBlood, intHolyWater) {
        super(strName, path, intAttack, intBlood, intHolyWater);
    }
    checkSoldierAttackStatus(cardId) {
        super.checkSoldierAttackStatus(cardId);
        if (this.intStayOnGround > 0) {
            this.intAttack += 2;
            super.renewCharacterBloodAttack(cardId, 0);
        }
    }
}
