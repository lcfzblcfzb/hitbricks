var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameManager = (function () {
    function GameManager() {
        this.balls = [];
        this.entityMap = {};
    }
    GameManager.getInstance = function () {
        return GameManager.gm;
    };
    GameManager.prototype.addToEntityMap = function (e) {
        //枚举恶心心
        if (this.entityMap[e.getName()] != null) {
            this.entityMap[e.getName()].push(e);
        }
        else {
            var arry = new Array();
            arry.push(e);
            this.entityMap[e.getName()] = arry;
        }
    };
    //初始化自身
    GameManager.prototype.init = function (stage) {
        //TODO 初始化
        this.stage = stage;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapInitBegin, this);
    };
    //初始化关卡数据;
    GameManager.prototype.initStage = function (stageConfig) {
        this.bat = new Bat(this.stage);
        this.stage.addChild(this.bat);
        var ball = new Ball(this.bat.x + 50, this.bat.y - 20);
        this.balls.push(ball);
        this.stage.addChild(ball);
        if (stageConfig == null || stageConfig == undefined) {
            console.log("[error] stageConfig not exist!");
            stageConfig = RES.getRes("demo_json");
        }
        for (var _i = 0, _a = stageConfig.configurables; _i < _a.length; _i++) {
            var config = _a[_i];
            if (getConfigurableByType(config.type) != null) {
                var configable = newInstance(getConfigurableByType(config.type), config);
                this.stage.addChild(configable);
                this.addToEntityMap(configable);
            }
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
    };
    //游戏开始， 初始化速度
    GameManager.prototype.onTouchTapInitBegin = function (evt) {
        egret.log("on onTouchTapInitBegin begin");
        for (var _i = 0, _a = this.balls; _i < _a.length; _i++) {
            var ball = _a[_i];
            ball.speedY = -3;
            ball.speedX = 0;
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
                this.bat.onHit(ball);
            }
            if (this.entityMap[WALL] != null) {
                for (var _b = 0, _c = this.entityMap[WALL]; _b < _c.length; _b++) {
                    var wall = _c[_b];
                    var wallRec = wall.getTransformedBounds(this.stage);
                    if (wallRec.intersects(ballRec)) {
                        wall.onHit(ball);
                    }
                }
            }
            if (this.entityMap[BRICK] != null) {
                for (var _d = 0, _e = this.entityMap[BRICK]; _d < _e.length; _d++) {
                    var brick = _e[_d];
                    var brickRec = brick.getTransformedBounds(this.stage);
                    if (brickRec.intersects(ballRec)) {
                        brick.onHit(ball);
                    }
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