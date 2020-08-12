var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameManager = (function () {
    function GameManager() {
        this.balls = [];
        this.bricks = new Array();
    }
    GameManager.getInstance = function () {
        return GameManager.gm;
    };
    GameManager.prototype.init = function (stage) {
        //TODO 初始化
        this.stage = stage;
        this.bat = new Bat(stage);
        this.stage.addChild(this.bat);
        var ball = new Ball(this.bat.x + 50, this.bat.y - 20);
        this.balls.push(ball);
        this.stage.addChild(ball);
        var demo = RES.getRes("demo_json");
        for (var _i = 0, _a = demo.bricks; _i < _a.length; _i++) {
            var config = _a[_i];
            var brick = Brick.createByConfig(config);
            this.stage.addChild(brick);
        }
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
        for (var _i = 0, _a = this.balls; _i < _a.length; _i++) {
            var ball = _a[_i];
            ball.speedY = -3;
            ball.speedX = 5;
        }
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapInitBegin, this);
        this.trigger.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchTapPlaying, this);
        this.trigger.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchTapPlaying, this);
    };
    GameManager.prototype.update = function (timeStamp) {
        for (var _i = 0, _a = this.balls; _i < _a.length; _i++) {
            var ball = _a[_i];
            ball.update(timeStamp);
            //
            var ballRec = ball.getTransformedBounds(this.stage);
            var batRec = this.bat.getTransformedBounds(this.stage);
            if (batRec.intersects(ballRec)) {
                ball.revertYSpeed();
            }
            for (var _b = 0, _c = this.bricks; _b < _c.length; _b++) {
                var brick = _c[_b];
                var brickRec = brick.getTransformedBounds(this.stage);
                if (brickRec.intersects(ballRec)) {
                    brick.onHit(ball);
                }
            }
        }
        return false;
    };
    GameManager.prototype.onTouchTapPlaying = function (evt) {
        if (this.bat != null) {
            this.bat.x = evt.stageX;
        }
    };
    GameManager.gm = new GameManager();
    return GameManager;
}());
__reflect(GameManager.prototype, "GameManager");
//# sourceMappingURL=GameManager.js.map