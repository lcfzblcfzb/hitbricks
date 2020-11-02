var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlayerMng = (function () {
    function PlayerMng() {
        //当前关卡信息
        this.chap = -1;
        this.index = -1;
    }
    PlayerMng.getInstance = function () {
        return PlayerMng.playerMng;
    };
    PlayerMng.playerMng = new PlayerMng();
    return PlayerMng;
}());
__reflect(PlayerMng.prototype, "PlayerMng");
//# sourceMappingURL=PlayerMng.js.map