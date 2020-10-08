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
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball(x, y) {
        var _this = _super.call(this) || this;
        _this.speedX = 0;
        _this.speedY = 0;
        _this.canMove = true;
        _this.name = "ball";
        _this.x = x;
        _this.y = y;
        _this.graphics.lineStyle(1, 0x00ff00);
        _this.graphics.beginFill(0xff0000, 1);
        _this.graphics.drawCircle(0, 0, 10);
        _this.graphics.endFill();
        _this.backStage = GameManager.getInstance().stage;
        return _this;
    }
    Ball.prototype.update = function (timeStamp) {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.y <= 0 || this.y > this.backStage.height) {
            this.speedY = -this.speedY;
        }
        if (this.x <= 0 || this.x > this.backStage.width) {
            this.speedX = -this.speedX;
        }
        console.log(this.x + ";" + this.y + ";" + this.speedX + ";" + this.speedY);
    };
    Ball.prototype.revertXSpeed = function () {
        this.speedX = -this.speedX;
    };
    Ball.prototype.revertYSpeed = function () {
        this.speedY = -this.speedY;
    };
    //override
    Ball.prototype.getName = function () {
        return BALL;
    };
    return Ball;
}(egret.Sprite));
__reflect(Ball.prototype, "Ball", ["IMovable", "IConfigurable"]);
//# sourceMappingURL=Ball.js.map