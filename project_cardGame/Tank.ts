class Tank extends Ethnicity{

    constructor(strName: string, path: string, intAttack: number, intBlood: number, intHolyWater: number){

        super(strName, path, intAttack, intBlood, intHolyWater);
        
    }

    public renewCharacterBloodAttack(cardId: string, loseBlood: number): void {
        this.intAttack += loseBlood;

        super.renewCharacterBloodAttack(cardId, loseBlood);
    }
}