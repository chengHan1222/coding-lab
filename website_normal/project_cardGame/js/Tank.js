class Tank extends Ethnicity {
    constructor(strName, path, intAttack, intBlood, intHolyWater) {
        super(strName, path, intAttack, intBlood, intHolyWater);
    }
    renewCharacterBloodAttack(cardId, loseBlood) {
        this.intAttack += loseBlood;
        super.renewCharacterBloodAttack(cardId, loseBlood);
    }
}
