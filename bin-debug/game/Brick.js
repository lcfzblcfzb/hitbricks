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
var Brick = (function (_super) {
    __extends(Brick, _super);
    function Brick(stage) {
        var _this = _super.call(this) || this;
        _this.name = "brick";
        _this.graphics.beginFill(0x00ff00, 1);
        _this.graphics.drawRect(0, 0, 10, 10);
        _this.graphics.endFill();
        _this.x = stage.stage.stageWidth / 2;
        _this.y = stage.stage.stageHeight * 0.1;
        return _this;
    }
    return Brick;
}(RebounceObj));
__reflect(Brick.prototype, "Brick");
//# sourceMappingURL=Brick.js.map