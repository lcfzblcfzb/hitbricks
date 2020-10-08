class GameManager {
	private constructor() {
	}

	static gm = new GameManager();

	bat: Bat;
	balls: Ball[] = [];
	stage: egret.DisplayObjectContainer;
	trigger: egret.Shape;
	entityMap: { [key: number]: Array<IConfigurable> } = {};

	static getInstance(): GameManager {
		return GameManager.gm;
	}

	private addToEntityMap(e: IConfigurable) {

		//枚举恶心心
		if (this.entityMap[e.getName()] != null) {
			this.entityMap[e.getName()].push(e);
		} else {
			let arry = new Array();
			arry.push(e);
			this.entityMap[e.getName()] = arry;
		}

	}
	//初始化自身
	init(stage: egret.DisplayObjectContainer): void {
		//TODO 初始化
		this.stage = stage;

		this.stage.addEventListener(GameProcessEvent.STAGE_END, this.stageSuccess, this);
	}

	//完成关卡
	stageSuccess() {
		console.log("stage success");

		if (StageMng.getInstance().isLastStage()) {
			//游戏结束；
		} else {
			//下一关
			this.initStage(StageMng.getInstance().getNextStage());
		}

	}
	//是否关卡成功完成
	isStageSuccess(): boolean {
		return false;
	}

	//是否关卡失败
	isStageFail(): boolean {
		return false;
	}

	//关卡失败结束
	stageFail() {
		//TODO gameOver
	}

	/**
	 * 重置下参数
	 */
	private _resetFields() {
		this.balls = [];
		this.entityMap = {};
		this.trigger = null;
		this.bat = null;
		this.stage.removeChildren();
	}

	//初始化关卡数据;
	initStage(stageConfig) {
		//重置下关卡
		this._resetFields();

		this.bat = new Bat(this.stage);
		this.stage.addChild(this.bat);

		let ball = new Ball(this.bat.x + 50, this.bat.y - 20);
		this.balls.push(ball);
		this.stage.addChild(ball);
		if (stageConfig == null || stageConfig == undefined) {
			console.log("[error] stageConfig not exist!");
			stageConfig = RES.getRes("demo_json");
		}
		for (let config of stageConfig.configurables) {
			if (getConfigurableByType(config.type) != null) {
				let configable: IConfigurable = newInstance(getConfigurableByType(config.type), config);
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
		this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapInitBegin, this);
	}

	//游戏开始， 初始化速度
	private onTouchTapInitBegin(evt: egret.TouchEvent) {
		egret.log("on onTouchTapInitBegin begin");

		for (let ball of this.balls) {
			ball.speedY = -6;
			ball.speedX = 0;
		}

		this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapInitBegin, this);
		this.trigger.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchTapPlaying, this);
		this.trigger.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchTapPlaying, this);
	}

	public update(timeStamp: number): boolean {

		for (let ball of this.balls) {
			ball.update(timeStamp);
			//
			let ballRec = ball.getTransformedBounds(this.stage);
			let batRec = this.bat.getTransformedBounds(this.stage);

			if (batRec.intersects(ballRec)) {
				this.bat.onHit(ball);
			}

			if (this.entityMap[WALL] != null) {
				for (let wall of this.entityMap[WALL]) {

					let wallRec = wall.getTransformedBounds(this.stage);

					if (wallRec.intersects(ballRec)) {
						(<Wall>wall).onHit(ball);
					}
				}
			}


			if (this.entityMap[BRICK] != null) {
				for (let brick of this.entityMap[BRICK]) {

					let brickRec = brick.getTransformedBounds(this.stage);

					if (brickRec.intersects(ballRec)) {
						(<Brick>brick).onHit(ball);
						if (this.isStageSuccess()) {
							this.stageSuccess();
						}
					}
				}
			}
		}

		return false;

	}

	private onTouchTapPlaying(evt: egret.TouchEvent) {
		if (this.bat != null) {
			this.bat.x = evt.stageX;

			let originRec = this.bat.getTransformedBounds(GameManager.getInstance().stage);
			let inflateRec = originRec.clone();

			inflateRec.inflate(this.balls[0].width / 2, this.balls[0].height / 2);//计算出碰撞外壳矩形;
			console.log(inflateRec.left + ";" + inflateRec.right + ";" + inflateRec.top+";"+inflateRec.bottom);

		}
	}

}