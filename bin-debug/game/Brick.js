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
    function Brick() {
        return _super.call(this) || this;
    }
    Brick.createByConfig = function (config) {
        var brick = new Brick();
        brick.x = config.x;
        brick.y = config.y;
        brick.name = "brick";
        brick.graphics.beginFill(0x00ff00, 1);
        brick.graphics.drawRect(0, 0, config.width, config.height);
        brick.graphics.endFill();
        return brick;
    };
    return Brick;
}(RebounceObj));
__reflect(Brick.prototype, "Brick");
//# sourceMappingURL=Brick.js.map