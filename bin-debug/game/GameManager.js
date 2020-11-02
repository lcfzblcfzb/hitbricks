var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameManager = (function () {
    function GameManager() {
        this.balls = [];
        this.entityMap = {};
        this.debugLine = new egret.Shape();
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
    GameManager.prototype.init = function (stage, setting) {
        //TODO 初始化
        this.stage = stage;
    };
    //完成关卡
    GameManager.prototype.stageSuccess = function () {
        this.finished = true;
        console.log("stage success");
        this.stage.dispatchEvent(GameProcessEvent.newInstance("STAGE_END", true));
        if (StageMng.getInstance().isLastStage()) {
            this.stage.dispatchEvent(GameProcessEvent.newInstance("GAME_END", true));
            //游戏结束；
        }
    };
    //是否关卡成功完成
    GameManager.prototype.isStageSuccess = function () {
        if (!this.finished) {
            if (this.entityMap[BRICK] != null) {
                return this.entityMap[BRICK].length <= 0;
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }
    };
    //是否关卡失败
    GameManager.prototype.isStageFail = function () {
        if (!this.finished) {
            return this.balls.length <= 0;
        }
        else {
            return false;
        }
    };
    //关卡失败结束
    GameManager.prototype.stageFail = function () {
        this.finished = true;
        this.stage.dispatchEvent(GameProcessEvent.newInstance("STAGE_END", false));
        // gameOver
        var event = GameProcessEvent.newInstance("GAME_END", false);
        this.stage.dispatchEvent(event);
    };
    /**
     * 重置下参数
     */
    GameManager.prototype._resetFields = function () {
        this.balls = [];
        this.entityMap = {};
        this.touchZone = null;
        this.bat = null;
        this.finished = false; //标记为，标记本局游戏是否完结了，完结之后不会触发其他的效果（成功、失败事件只会触发一次）
        if (this.stage != null)
            this.stage.removeChildren();
    };
    //初始化关卡数据;
    GameManager.prototype.initStage = function (stageConfig) {
        var _this = this;
        //重置下关卡
        this._resetFields();
        this.bat = new Bat(this.stage);
        // this.bat.y = this.bat.y * window.innerHeight * this.stage.width / (window.innerWidth * this.stage.height);
        // this.bat.y = this.bat.y * window.innerHeight / this.stage.height;
        console.log("bat height" + this.bat.y);
        this.stage.addChild(this.bat);
        var ball = new Ball(this.bat.x, this.bat.y - 20);
        this.balls.push(ball);
        this.stage.addChild(ball);
        if (stageConfig == null || stageConfig == undefined) {
            console.log("[error] stageConfig not exist!");
            stageConfig = RES.getRes("demo_json");
        }
        //关卡编辑器里头把 configurables 保存成 string  对象，需要再次转化一下；
        var configurables = stageConfig.configurables;
        if (typeof configurables == "string") {
            configurables = JSON.parse(configurables);
        }
        for (var _i = 0, configurables_1 = configurables; _i < configurables_1.length; _i++) {
            var config = configurables_1[_i];
            if (config.type != null) {
                if (getConfigurableByType(config.type) != null) {
                    var configable = newInstance(getConfigurableByType(config.type), config);
                    //修正一下宽高比
                    // console.log("windowwidth:" + window.innerWidth);
                    // console.log("windowheight:" + window.innerHeight);
                    // console.log("stagewidth:" + this.stage.width);
                    // console.log("stageheight:" + this.stage.height);
                    // console.log("prv"+configable.y );
                    // console.log("aft"+configable.y );
                    if (true) {
                        var hitRec = new egret.Shape();
                        var inflateRec = configable.getTransformedBounds(GameManager.getInstance().stage).clone();
                        //DEBUG------
                        inflateRec.inflate(ball.width / 2, ball.height / 2); //计算出碰撞外壳矩形;
                        hitRec.x = inflateRec.x;
                        hitRec.y = inflateRec.y;
                        hitRec.graphics.lineStyle(0, 0x000080);
                        hitRec.graphics.beginFill(0x000080, 1);
                        hitRec.graphics.drawRect(0, 0, inflateRec.width, inflateRec.height);
                        hitRec.graphics.endFill();
                        this.stage.addChild(hitRec);
                    }
                    //------DEBUG
                    this.stage.addChild(configable);
                    this.addToEntityMap(configable);
                }
            }
        }
        this.touchZone = new egret.Shape();
        this.touchZone.name = "startTrigger";
        this.touchZone.graphics.beginFill(0x00ff00, 0);
        this.touchZone.graphics.drawRect(0, 0, this.stage.stage.stageWidth, 2 * (this.stage.stage.stageHeight - this.bat.y));
        this.touchZone.graphics.endFill();
        this.touchZone.x = 0;
        this.touchZone.y = 2 * this.bat.y - this.stage.stage.stageHeight;
        this.touchZone.width = this.stage.width;
        this.touchZone.touchEnabled = true;
        this.stage.addChild(this.touchZone);
        this.deadZone = new egret.Shape();
        this.deadZone.name = "deadZone";
        this.deadZone.graphics.beginFill(0x191970, 0.2);
        this.deadZone.graphics.drawRect(0, 0, this.stage.width, 100);
        this.deadZone.graphics.endFill();
        this.deadZone.x = 0;
        this.deadZone.y = this.bat.y + (this.stage.height - this.bat.y) / 2;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onInitTouchMoveListener, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onInitTouchMoveListener, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchTapInitBegin, this);
        this.stage.dispatchEvent(new GameProcessEvent("STAGE_START"));
        if (true) {
            var gmBtn = new eui.Button();
            gmBtn.label = "over";
            gmBtn.addEventListener("touchEnd", function (e) {
                _this.stageSuccess();
                e.stopPropagation();
            }, this);
            this.stage.addChild(gmBtn);
            this.stage.addChild(this.debugLine);
            this.debugLine.graphics.lineStyle(0.5, 0xff3814, 0.5);
        }
    };
    //游戏开始， 初始化速度,移除准备事件的回调，增加游戏中的事件监听
    GameManager.prototype.onTouchTapInitBegin = function (evt) {
        egret.log("on onTouchTapInitBegin begin");
        var config = RES.getRes("myGame_json");
        for (var _i = 0, _a = this.balls; _i < _a.length; _i++) {
            var ball = _a[_i];
            ball.speedY = config['ballInitSpeedY'];
            ball.speedX = config['ballInitSpeedX'];
        }
        //移除准备事件回调
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onInitTouchMoveListener, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onInitTouchMoveListener, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchTapInitBegin, this);
        //增加游戏中监听
        this.touchZone.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchTapPlaying, this);
        this.touchZone.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchTapPlaying, this);
    };
    //游戏开始，玩家按下手指还没抬起的事件回调
    GameManager.prototype.onInitTouchMoveListener = function (evt) {
        if (this.bat != null) {
            this.bat.x = evt.stageX;
            for (var _i = 0, _a = this.balls; _i < _a.length; _i++) {
                var ball = _a[_i];
                ball.x = this.bat.x;
            }
        }
    };
    GameManager.prototype.update = function (timeStamp) {
        for (var _i = 0, _a = this.balls; _i < _a.length; _i++) {
            var ball = _a[_i];
            this.debugLine.graphics.moveTo(ball.x, ball.y);
            ball.update(timeStamp);
            this.debugLine.graphics.lineTo(ball.x, ball.y);
            var ballDebugRec = ball.getTransformedBounds(this.stage);
            this.debugLine.graphics.drawRect(ballDebugRec.x, ballDebugRec.y, ballDebugRec.width, ballDebugRec.height);
            this.debugLine.graphics.endFill();
            var ballRec = ball.getTransformedBounds(this.stage);
            var deadRec = this.deadZone.getTransformedBounds(this.stage);
            if (deadRec.intersects(ballRec)) {
                this.stage.removeChild(ball);
                var idx = this.balls.indexOf(ball);
                this.balls.splice(idx, 1);
                if (this.isStageFail()) {
                    this.stageFail();
                }
            }
            //
            var batRec = this.bat.getTransformedBounds(this.stage);
            if (batRec.intersects(ballRec)) {
                this.bat.onHit(ball);
            }
            if (this.entityMap[WALL] != null) {
                for (var _b = 0, _c = this.entityMap[WALL]; _b < _c.length; _b++) {
                    var wall = _c[_b];
                    var wallRec = wall.getTransformedBounds(this.stage);
                    if (wallRec.intersects(ballRec)) {
                        if (ball.collitionTag < timeStamp) {
                            wall.onHit(ball);
                            ball.collitionTag = timeStamp;
                        }
                    }
                }
            }
            if (this.entityMap[BRICK] != null) {
                for (var _d = 0, _e = this.entityMap[BRICK]; _d < _e.length; _d++) {
                    var brick = _e[_d];
                    var brickRec = brick.getTransformedBounds(this.stage);
                    if (brickRec.intersects(ballRec)) {
                        if (ball.collitionTag < timeStamp) {
                            brick.onHit(ball);
                            ball.collitionTag = timeStamp;
                            if (this.isStageSuccess()) {
                                this.stageSuccess();
                            }
                        }
                    }
                }
            }
        }
        return false;
    };
    //移动事件监听;
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