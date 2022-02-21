class StaticVar {
    static checkIfOutSafeSide(event) {
        if (event.target.parentElement === null || event.target.parentElement.className.indexOf('playerCard') === -1)
            return false;
        if (this.mapPlayerCards[event.target.parentElement.id].strStatus !== "unset")
            return false;
        if (event.pageX <= this.mapSafeSideRange["divLeft"] || event.pageX >= this.mapSafeSideRange["divLeft_Width"] ||
            event.pageY <= this.mapSafeSideRange["divTop"] || event.pageY >= this.mapSafeSideRange["divTop_Height"]) {
            this.objPlayCardFocus.resetPlayCard();
            return false;
        }
        return true;
    }
}
StaticVar.isGameStart = false;
StaticVar.isPlayCardMove = false;
StaticVar.objPlayCardFocus = null;
StaticVar.tagPlayCardFocus = null;
StaticVar.objAttacker = null;
StaticVar.objDefender = null;
StaticVar.mapPlayerCards = {};
StaticVar.arrEthnicitys = [];
StaticVar.mapSafeSideRange = {};
StaticVar.arrIntPointSite = [];
StaticVar.arrIntOriginSite = [];
