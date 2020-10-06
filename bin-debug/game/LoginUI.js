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
        _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onStart, _this);
        return _this;
    }
    LoginUI.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    LoginUI.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    LoginUI.prototype.onStart = function (e) {
        if (e.target.id = "playBtn") {
            GameManager.getInstance().initStage(StageMng.getInstance().getCurrentStage());
        }
    };
    return LoginUI;
}(eui.Component));
__reflect(LoginUI.prototype, "LoginUI", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=LoginUI.js.map