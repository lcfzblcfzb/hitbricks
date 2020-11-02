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
        _this.collitionTag = -1;
        _this.name = "ball";
        _this.x = x;
        _this.y = y;
        var config = RES.getRes("myGame_json");
        _this.backStage = GameManager.getInstance().stage;
        var configWidth = config.ballRadius * 2;
        var configHeight = config.ballRadius * 2;
        _this.width = configWidth;
        _this.height = configHeight;
        _this.anchorOffsetX = config.ballRadius;
        _this.anchorOffsetY = config.ballRadius;
        var mcFactory = _this.backStage.stage['mcFactory'];
        var mc1 = new egret.MovieClip(mcFactory.generateMovieClipData("ball"));
        //设置缩放
        var scaleX = _this.width / mc1.width;
        var scaleY = _this.height / mc1.height;
        mc1.scaleX = scaleX;
        mc1.scaleY = scaleY;
        _this.addChild(mc1);
        mc1.gotoAndPlay(0, -1);
        return _this;
    }
    Ball.prototype.update = function (timeStamp) {
        this.x += this.speedX;
        this.y += this.speedY;
        //保证不会跑出画布;
        if (this.y <= 0 && this.speedY < 0 || this.y > this.backStage.height && this.speedY > 0) {
            this.speedY = -this.speedY;
        }
        if (this.x <= 0 && this.speedX < 0) {
            this.speedX = -this.speedX;
        }
        else if (this.x > this.backStage.width && this.speedX > 0) {
            this.speedX = -this.speedX;
        }
    };
    Ball.prototype.resetXSpeed = function (direction) {
        if (direction) {
            this.speedX = Math.abs(this.speedX);
        }
        else {
            this.speedX = -Math.abs(this.speedX);
        }
    };
    Ball.prototype.resetYSpeed = function (direction) {
        if (direction) {
            this.speedY = Math.abs(this.speedY);
        }
        else {
            this.speedY = -Math.abs(this.speedY);
        }
    };
    //override
    Ball.prototype.getName = function () {
        return BALL;
    };
    return Ball;
}(egret.Sprite));
__reflect(Ball.prototype, "Ball", ["IMovable", "IConfigurable"]);
//# sourceMappingURL=Ball.js.map