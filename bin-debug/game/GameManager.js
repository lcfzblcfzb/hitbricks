var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameManager = (function () {
    function GameManager() {
        this.bricks = [];
    }
    GameManager.getInstance = function () {
        return GameManager.gm;
    };
    GameManager.prototype.init = function (stage) {
        //TODO 初始化
        this.stage = stage;
        this.bat = new Bat(stage);
        this.stage.addChild(this.bat);
        this.ball = new Ball(this.bat.x + 50, this.bat.y - 20);
        this.stage.addChild(this.ball);
        var brick = new Brick(stage);
        this.stage.addChild(brick);
        this.bricks.push(brick);
        this.trigger = new egret.Shape();
        this.trigger.name = "startTrigger";
        this.trigger.graphics.beginFill(0x00ff00, 0.2);
        this.trigger.graphics.drawRect(0, 0, this.stage.stage.stageWidth, 100);
        this.trigger.graphics.endFill();
        this.trigger.x = 0;
        this.trigger.y = this.bat.y;
        this.trigger.touchEnabled = true;
        this.stage.addChild(this.trigger);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapInitBegin, this);
    };
    //游戏开始， 初始化速度
    GameManager.prototype.onTouchTapInitBegin = function (evt) {
        egret.log("on onTouchTapInitBegin begin");
        this.ball.speedY = -3;
        this.ball.speedX = 5;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapInitBegin, this);
        this.trigger.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchTapPlaying, this);
        this.trigger.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchTapPlaying, this);
    };
    GameManager.prototype.update = function (timeStamp) {
        this.ball.update(timeStamp);
        //TODO
        var ballRec = this.ball.getTransformedBounds(this.stage);
        var batRec = this.bat.getTransformedBounds(this.stage);
        if (batRec.intersects(ballRec)) {
            this.ball.revertYSpeed();
        }
        for (var _i = 0, _a = this.bricks; _i < _a.length; _i++) {
            var brick = _a[_i];
            var brickRec = brick.getTransformedBounds(this.stage);
            if (brickRec.intersects(ballRec)) {
                brick.onHit(this.ball);
            }
        }
        return false;
    };
    GameManager.prototype.onTouchTapPlaying = function (evt) {
        if (this.bat != null) {
            this.bat.x = evt.stageX;
        }
    };
    //计算直线与矩形的交点
    GameManager.prototype.calcPoints = function (rec, k, b) {
        var result = [];
        var left = rec.left;
        var bottom = rec.bottom;
        var right = rec.right;
        var top = rec.top;
        //需要特殊处理 垂直的情况
        if (k != Number.POSITIVE_INFINITY) {
            var leftPoint = new egret.Point(left, k * left + b);
            var rightPoint = new egret.Point(right, k * right + b);
            result.push(leftPoint);
            result.push(rightPoint);
        }
        //平行的情况则不处理
        if (k != 0) {
            var topPoint = new egret.Point((top - b) / k, top);
            var bottomPoint = new egret.Point((bottom - b) / k, bottom);
            result.push(topPoint);
            result.push(bottomPoint);
        }
        var finalResult = [];
        for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
            var p = result_1[_i];
            if (!(p.x < left || p.x > right || p.y < top || p.y > bottom)) {
                finalResult.push(p);
            }
        }
        return finalResult;
    };
    //计算第一个碰撞点
    GameManager.prototype.calcFirstIntersecPoint = function (points) {
        if (points.length < 2)
            return null;
        var p1 = points[0];
        var p2 = points[1];
        var kBall = Number.POSITIVE_INFINITY;
        if (this.ball.speedX != 0) {
            this.ball.speedY / this.ball.speedX;
        }
        var k = Number.POSITIVE_INFINITY;
        if (p2.x != p1.x) {
            var k_1 = (p2.y - p1.y) / (p2.x - p1.x);
        }
        if (kBall == Number.POSITIVE_INFINITY && k == Number.POSITIVE_INFINITY) {
            return p2.y > p1.y ? p2 : p1;
        }
        else if (kBall == Number.POSITIVE_INFINITY || k == Number.POSITIVE_INFINITY) {
            return null;
        }
        else {
            if (kBall == k) {
                return p1; //斜率相同，p1->p2;
            }
            else if (kBall == -k) {
                return p2; //相反，p2->p1;
            }
            else {
                return null;
            }
        }
    };
    GameManager.gm = new GameManager();
    return GameManager;
}());
__reflect(GameManager.prototype, "GameManager");
//# sourceMappingURL=GameManager.js.map