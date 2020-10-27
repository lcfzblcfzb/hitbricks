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
var LoginUI = (function (_super) {
    __extends(LoginUI, _super);
    function LoginUI() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onStart, _this, false);
        return _this;
    }
    LoginUI.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    LoginUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.anchorOffsetX = this.width / 2;
        this.x = this.stage.stageWidth / 2;
        this.y = this.stage.stageHeight * 0.2;
        var stageLbl = this['stageNum'];
        stageLbl.text = PlayerMng.getInstance().chap + "_" + PlayerMng.getInstance().index;
        var mcFactory = this.stage['mcFactory'];
        var mc1 = new egret.MovieClip(mcFactory.generateMovieClipData("start_btn_pressed"));
        // mc1.anchorOffsetX = mc1.width/2;
        this['startGroup'].addChild(mc1);
        this.scaleX = 128 / mc1.width;
        this.scaleY = 128 / mc1.height;
        mc1.gotoAndPlay(0, -1);
    };
    LoginUI.prototype.onStart = function (e) {
        if (e.target.name == "startGroup") {
            this.dispatchEvent(new GameProcessEvent("GAME_START"));
            GameManager.getInstance().initStage(StageMng.getInstance().getCurrentStage());
        }
    };
    LoginUI.prototype.updateStageIndex = function () {
        var stageLbl = this['stageNum'];
        stageLbl.text = PlayerMng.getInstance().chap + "-" + PlayerMng.getInstance().index;
    };
    return LoginUI;
}(eui.Component));
__reflect(LoginUI.prototype, "LoginUI", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=LoginUI.js.map