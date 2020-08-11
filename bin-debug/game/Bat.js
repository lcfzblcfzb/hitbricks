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
var Bat = (function (_super) {
    __extends(Bat, _super);
    function Bat(stage) {
        var _this = _super.call(this) || this;
        var stageW = stage.stage.stageWidth;
        var stageH = stage.stage.stageHeight;
        _this.name = "bat";
        _this.graphics.beginFill(0x000000, 1);
        _this.graphics.drawRect(0, 0, 100, 10);
        _this.width = 100;
        _this.height = 10;
        _this.x = stageW / 2 - 50;
        _this.y = stageH * 0.8;
        _this.graphics.endFill();
        return _this;
    }
    return Bat;
}(egret.Sprite));
__reflect(Bat.prototype, "Bat");
//# sourceMappingURL=Bat.js.map