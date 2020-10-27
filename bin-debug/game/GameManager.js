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
    GameManager.prototype.init = function (stage, setting) {
        //TODO 初始化
        this.stage = stage;
    };
    //完成关卡
    GameManager.prototype.stageSuccess = function () {
        console.log("stage success");
        this.stage.dispatchEvent(new GameProcessEvent("STAGE_END"));
        if (StageMng.getInstance().isLastStage()) {
            this.stage.dispatchEvent(new GameProcessEvent("GAME_END"));
            //游戏结束；
        }
        else {
            //下一关
            var nextStage = StageMng.getInstance().getNextStage();
            this.initStage(nextStage);
            PlayerMng.getInstance().chap = parseInt(nextStage.chap);
            PlayerMng.getInstance().index = parseInt(nextStage.index);
        }
    };
    //是否关卡成功完成
    GameManager.prototype.isStageSuccess = function () {
        if (this.entityMap[BRICK] != null) {
            return this.entityMap[BRICK].length <= 0;
        }
        else {
            return true;
        }
    };
    //是否关卡失败
    GameManager.prototype.isStageFail = function () {
        return this.balls.length <= 0;
    };
    //关卡失败结束
    GameManager.prototype.stageFail = function () {
        this.stage.dispatchEvent(new GameProcessEvent("STAGE_END"));
        // gameOver
        var event = new GameProcessEvent("GAME_END");
        this.stage.dispatchEvent(event);
    };
    /**
     * 重置下参数
     */
    GameManager.prototype._resetFields = function () {
        this.balls = [];
        this.entityMap = {};
        this.trigger = null;
        this.bat = null;
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
                    // let hitRec = new egret.Shape();
                    // let inflateRec = configable.getTransformedBounds(GameManager.getInstance().stage).clone();
                    //DEBUG------
                    // inflateRec.inflate(ball.width / 2, ball.height / 2);//计算出碰撞外壳矩形;
                    // hitRec.x = inflateRec.x;
                    // hitRec.y = inflateRec.y;
                    // hitRec.graphics.lineStyle(0, 0x000080);
                    // hitRec.graphics.beginFill(0x000080, 1);
                    // hitRec.graphics.drawRect(0, 0, inflateRec.width, inflateRec.height);
                    // hitRec.graphics.endFill();
                    // this.stage.addChild(hitRec);
                    //------DEBUG
                    this.stage.addChild(configable);
                    this.addToEntityMap(configable);
                }
            }
        }
        this.trigger = new egret.Shape();
        this.trigger.name = "startTrigger";
        this.trigger.graphics.beginFill(0x00ff00, 0.2);
        this.trigger.graphics.drawRect(0, 0, this.stage.stage.stageWidth, 100);
        this.trigger.graphics.endFill();
        this.trigger.x = 0;
        this.trigger.y = this.bat.y;
        this.trigger.height = 100;
        this.trigger.width = this.stage.width;
        this.trigger.touchEnabled = true;
        this.stage.addChild(this.trigger);
        console.log(this.trigger.getBounds().height);
        this.deadZone = new egret.Shape();
        this.deadZone.name = "deadZone";
        this.deadZone.graphics.beginFill(0x191970, 0.2);
        this.deadZone.graphics.drawRect(0, 0, this.stage.width, 100);
        this.deadZone.graphics.endFill();
        this.deadZone.x = 0;
        this.deadZone.y = this.bat.y + (this.stage.height - this.bat.y) / 2;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapInitBegin, this);
        this.stage.dispatchEvent(new GameProcessEvent("STAGE_START"));
        console.log("windowwidth:" + window.innerWidth);
        console.log("windowheight:" + window.innerHeight);
        console.log("stagestagewidth:" + this.stage.stage.stageWidth);
        console.log("stagestageheight:" + this.stage.stage.stageHeight);
        if (true) {
            var gmBtn = new eui.Button();
            gmBtn.label = "over";
            gmBtn.addEventListener("touchEnd", function (e) {
                _this.stageSuccess();
            }, this);
            this.stage.addChild(gmBtn);
        }
    };
    //游戏开始， 初始化速度
    GameManager.prototype.onTouchTapInitBegin = function (evt) {
        egret.log("on onTouchTapInitBegin begin");
        for (var _i = 0, _a = this.balls; _i < _a.length; _i++) {
            var ball = _a[_i];
            ball.speedY = -12;
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
    GameManager.prototype.onTouchTapPlaying = function (evt) {
        if (this.bat != null) {
            this.bat.x = evt.stageX;
            var originRec = this.bat.getTransformedBounds(GameManager.getInstance().stage);
            var inflateRec = originRec.clone();
            inflateRec.inflate(this.balls[0].width / 2, this.balls[0].height / 2); //计算出碰撞外壳矩形;
            // console.log(inflateRec.left + ";" + inflateRec.right + ";" + inflateRec.top + ";" + inflateRec.bottom);
        }
    };
    GameManager.gm = new GameManager();
    return GameManager;
}());
__reflect(GameManager.prototype, "GameManager");
//# sourceMappingURL=GameManager.js.map