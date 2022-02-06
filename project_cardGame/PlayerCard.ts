class PlayerCard {

    isShow: boolean = true;
    isBorderShow: boolean = false;
    isFixed: boolean = true;
    strId: string;
    strStatus: "none" | "unset" | "ready" | 'canAttack' = "unset";
    character: Ethnicity;
    
    static intObjectCount: number = 0;

    constructor(character: Ethnicity, intX: number, intY: number, isFixed: boolean, inputPlaceId: string){
        this.isFixed = isFixed;
        this.character = character;
        this.strId = "playerCard" + PlayerCard.intObjectCount;
        

        let divPlayerCard = document.createElement("div");
        divPlayerCard.id = "playerCard" + PlayerCard.intObjectCount;
        divPlayerCard.className = "playerCard";
        divPlayerCard.innerHTML = `
            <img src="` + character.picturePath + `">
            <div class="charInfo charBlood" style="top: 0; background-color: red">` + character.intBlood + `</div>
            <div class="charInfo charAttack" style="top: 27px; background-color: blue">` + character.intAttack + `</div>
        `
        divPlayerCard.style.left = intX + "%";
        divPlayerCard.style.top = intY + "%";
        divPlayerCard.style.transform = `translate(-` + intX + `%, -` + intY + `%)`;

        document.getElementById(inputPlaceId).appendChild(divPlayerCard);
        
        FightSystem.mapPlayerCards["playerCard" + PlayerCard.intObjectCount] = this;

        PlayerCard.intObjectCount++;
    }

    public static initialize(): void {
        FightSystem.mapSafeSideRange["divLeft"] = document.getElementById("putCardArea").offsetLeft;
        FightSystem.mapSafeSideRange["divLeft_Width"] = 
            document.getElementById("putCardArea").offsetLeft + document.getElementById("safeSide").offsetWidth;
        FightSystem.mapSafeSideRange["divTop_Height"] = 
            document.getElementById("safeSide").offsetTop + document.getElementById("safeSide").offsetHeight;

        document.getElementById('putCardArea').style.display = 'none';
    }


    public static cardMouseDown(event): void {
        if (event.target.parentElement === null || event.target.parentElement.className.indexOf('playerCard') === -1) {
            PlayerCard.cleanLastCardBorder();
            document.getElementById('putCardArea').style.display = 'none';
            return;
        };

        if (FightSystem.objPlayCardFocus !== null) {
            PlayerCard.cleanLastCardBorder();
        }

        PlayerCard.setFocusPlayerCard(event);

        if (FightSystem.objPlayCardFocus.strStatus === "unset" && !FightSystem.objPlayCardFocus.isFixed) {
            document.getElementById('putCardArea').style.display = 'block';

            PlayerCard.setOriginSite(event)
        }


        if (FightSystem.objPlayCardFocus.strStatus === "canAttack"){
            FightSystem.objAttacker = FightSystem.objPlayCardFocus;

            document.getElementById("attackSword").style.display = "block";
            PlayerCard.setAttackSwordPosition(event);
        }
    }
    private static cleanLastCardBorder(): void {
        if (FightSystem.objPlayCardFocus) 
            FightSystem.objPlayCardFocus.isBorderShow =
                FightSystem.objPlayCardFocus.showOrNOBorder(FightSystem.objPlayCardFocus.strId, false);

        FightSystem.objPlayCardFocus = null;
    }
    private static setFocusPlayerCard(event: { target: { parentElement: HTMLElement; }; }): void {
        FightSystem.tagPlayCardFocus = event.target.parentElement;
        FightSystem.objPlayCardFocus = FightSystem.mapPlayerCards[event.target.parentElement.id];
        FightSystem.objPlayCardFocus.isBorderShow = FightSystem.objPlayCardFocus.showOrNOBorder(FightSystem.objPlayCardFocus.strId, true);
    }
    private static setOriginSite(event: { pageX: number; pageY: number; }): void {
        FightSystem.isPlayCardMove = true;
        FightSystem.arrIntPointSite = [event.pageX, event.pageY];
        FightSystem.arrIntOriginSite = [FightSystem.tagPlayCardFocus.offsetLeft, FightSystem.tagPlayCardFocus.offsetTop];
    }


    public static cardMouseMove(event: { pageX: number; pageY: number; }): void {
        if (FightSystem.isPlayCardMove) {
            PlayerCard.movePlayerCard(event);
        }

        if (FightSystem.objPlayCardFocus !== null && FightSystem.objPlayCardFocus.strStatus === "canAttack") {
            PlayerCard.setAttackSwordPosition(event);
        }
    }
    private static movePlayerCard(event: { pageX: any; pageY: any; }): void {
        let instanceX = event.pageX - FightSystem.arrIntPointSite[0];
        let instanceY = event.pageY - FightSystem.arrIntPointSite[1];
        FightSystem.tagPlayCardFocus.style.left = FightSystem.arrIntOriginSite[0] + instanceX + 'px';
        FightSystem.tagPlayCardFocus.style.top = FightSystem.arrIntOriginSite[1] + instanceY + 'px';
    }
    private static setAttackSwordPosition(event: { pageX: number; pageY: number; }): void {
        document.getElementById("attackSword").style.left = event.pageX + 1.5 + "px";
        document.getElementById("attackSword").style.top = event.pageY + 1.5 + "px";
    }


    public static cardMouseUp(event): void {
        FightSystem.isPlayCardMove = false;
        document.getElementById("attackSword").style.display = "none";


        PlayerCard.putSoliderOnGround(event);

        if (event.target.parentElement === null || event.target.parentElement.className.indexOf('player') === -1 ||
            FightSystem.objPlayCardFocus.strStatus !== "canAttack") return;


        if (event.target.parentElement.parentElement.id === "enemySide" && FightSystem.objAttacker) {
            PlayerCard.attackSoldier(event);
        }

        else if (event.target.parentElement.id === "playerDefender" && FightSystem.objAttacker){
            PlayerCard.attackPlayer(event);
        }

        FightSystem.objAttacker = null;
    }
    private static putSoliderOnGround(event): void {
        let isMovingSuccess: boolean = false;
        isMovingSuccess = FightSystem.checkIfOutSafeSide(event);
    
        if (Player.playerAttacker.arrSoldierOnGround.length >= 7 && FightSystem.objPlayCardFocus.strStatus === 'unset')
            FightSystem.objPlayCardFocus.resetPlayerCard();

        else if (isMovingSuccess) FightSystem.putPlayerCardOnGround();
    }
    private static attackSoldier(event): void {
        FightSystem.objDefender = FightSystem.mapPlayerCards[event.target.parentElement.id];

        FightSystem.objDefender.character.intBlood -= FightSystem.objAttacker.character.intAttack;
        FightSystem.objAttacker.character.intBlood -= FightSystem.objDefender.character.intAttack;

        FightSystem.objDefender.character
            .renewCharacterBloodAttack(FightSystem.objDefender.strId, FightSystem.objAttacker.character.intAttack);
        FightSystem.objAttacker.character
            .renewCharacterBloodAttack(FightSystem.objAttacker.strId, FightSystem.objDefender.character.intAttack);

        FightSystem.objDefender.character.decideIsDie(FightSystem.objDefender.strId, "defense");

        FightSystem.objAttacker.strStatus = "ready";
        if (!FightSystem.objAttacker.character.decideIsDie(FightSystem.objAttacker.strId, "attack"))
            document.getElementById(FightSystem.objAttacker.strId).classList.remove("canAttack");
    }
    private static attackPlayer(event): void {
        Player.playerDefender.intBlood -= FightSystem.objAttacker.character.intAttack;
        document.getElementById(event.target.parentElement.id).childNodes[3].firstChild.nodeValue = Player.playerDefender.intBlood + "";

        Player.playerDefender.decideIsDie();

        FightSystem.objAttacker.strStatus = "ready";
        document.getElementById(FightSystem.objAttacker.strId).classList.remove("canAttack");
    }


    public showOrNOBorder(playCardFocusID: string, isShowBorder: boolean): boolean{
        if (document.getElementById(playCardFocusID) === null) return;

        
        if (isShowBorder) document.getElementById(playCardFocusID).style.border = "4px solid yellow";
        else document.getElementById(playCardFocusID).style.border = ""

        return isShowBorder;
    }


    public resetPlayerCard(): void{
        let tagPlayCardFocus = document.getElementById(this.strId);
        tagPlayCardFocus.style.left = FightSystem.arrIntOriginSite[0] + 'px';
        tagPlayCardFocus.style.top = FightSystem.arrIntOriginSite[1] + 'px';
    }


    public changeUnsetToReady(): void {
        this.strStatus = 'ready';

        let tagPlayerCard = document.getElementById(this.strId);
        tagPlayerCard.classList.add('playerCardOnGround');
        tagPlayerCard.style.transform = '';
        tagPlayerCard.style.left = '';
        tagPlayerCard.style.top = '';
    }

}
window.addEventListener('load', PlayerCard.initialize);