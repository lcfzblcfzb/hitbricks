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
    function Brick(config) {
        var _this = _super.call(this) || this;
        _this.x = config.x;
        _this.y = config.y;
        _this.name = "brick";
        _this.graphics.beginFill(config.color, 1);
        _this.graphics.drawRect(0, 0, config.width, config.height);
        _this.graphics.endFill();
        _this.deleteOnHit = true;
        return _this;
    }
    Brick.prototype.getName = function () {
        return BRICK;
    };
    return Brick;
}(RebounceObj));
__reflect(Brick.prototype, "Brick");
//# sourceMappingURL=Brick.js.map