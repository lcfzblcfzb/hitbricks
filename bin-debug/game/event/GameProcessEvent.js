var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 游戏进程事件
 */
var GameProcessEvent = (function (_super) {
    __extends(GameProcessEvent, _super);
    function GameProcessEvent(type, cancelable) {
        if (cancelable === void 0) { cancelable = false; }
        return _super.call(this, type, true, cancelable) || this;
    }
    GameProcessEvent.GAME_START = "GAME_START";
    GameProcessEvent.STAGE_START = "STAGE_START";
    GameProcessEvent.STAGE_END = "STAGE_END";
    GameProcessEvent.GAME_END = "GAME_END";
    GameProcessEvent.STAGE_PAUSED = "STAGE_PAUSED";
    GameProcessEvent.STAGE_RETURN = "STAGE_RETURN";
    return GameProcessEvent;
}(egret.Event));
__reflect(GameProcessEvent.prototype, "GameProcessEvent");
//# sourceMappingURL=GameProcessEvent.js.map