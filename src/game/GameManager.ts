
class GameManager {
	private constructor() {
	}

	static gm = new GameManager();

	bat: Bat;
	balls: Ball[] = [];
	stage: egret.DisplayObjectContainer;
	deadZone: egret.Shape;//死亡判定区域；
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
	init(stage: egret.DisplayObjectContainer, setting: any): void {
		//TODO 初始化
		this.stage = stage;
	}

	//完成关卡
	stageSuccess() {

		console.log("stage success");
		this.stage.dispatchEvent(new GameProcessEvent("STAGE_END"));
		if (StageMng.getInstance().isLastStage()) {
			this.stage.dispatchEvent(new GameProcessEvent("GAME_END"));
			//游戏结束；
		} else {
			//下一关
			let nextStage: any = StageMng.getInstance().getNextStage();
			this.initStage(nextStage);

			PlayerMng.getInstance().chap = parseInt(nextStage.chap);
			PlayerMng.getInstance().index = parseInt( nextStage.index);

		}

	}
	//是否关卡成功完成
	isStageSuccess(): boolean {
		if (this.entityMap[BRICK] != null) {
			return this.entityMap[BRICK].length <= 0;
		} else {
			return true;
		}
	}

	//是否关卡失败
	isStageFail(): boolean {
		return this.balls.length <= 0;
	}

	//关卡失败结束
	stageFail() {

		this.stage.dispatchEvent(new GameProcessEvent("STAGE_END"));
		// gameOver
		let event = new GameProcessEvent("GAME_END");
		this.stage.dispatchEvent(event);
	}

	/**
	 * 重置下参数
	 */
	private _resetFields() {
		this.balls = [];
		this.entityMap = {};
		this.trigger = null;
		this.bat = null;
		if (this.stage != null)
			this.stage.removeChildren();
	}

	//初始化关卡数据;
	initStage(stageConfig) {
		//重置下关卡
		this._resetFields();

		this.bat = new Bat(this.stage);

		// this.bat.y = this.bat.y * window.innerHeight * this.stage.width / (window.innerWidth * this.stage.height);
		// this.bat.y = this.bat.y * window.innerHeight / this.stage.height;

		console.log("bat height" + this.bat.y);

		this.stage.addChild(this.bat);

		let ball = new Ball(this.bat.x, this.bat.y - 20);
		this.balls.push(ball);
		this.stage.addChild(ball);
		if (stageConfig == null || stageConfig == undefined) {
			console.log("[error] stageConfig not exist!");
			stageConfig = RES.getRes("demo_json");
		}

		//关卡编辑器里头把 configurables 保存成 string  对象，需要再次转化一下；
		let configurables = stageConfig.configurables;
		if (typeof configurables == "string") {
			configurables = JSON.parse(configurables);
		}

		for (let config of configurables) {
			if (config.type != null) {
				if (getConfigurableByType(config.type) != null) {
					let configable: IConfigurable = newInstance(getConfigurableByType(config.type), config);
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

		if (DEBUG) {
			let gmBtn = new eui.Button();
			gmBtn.label = "over";
			gmBtn.addEventListener("touchEnd", (e) => {
				this.stageSuccess();
			}, this);
			this.stage.addChild(gmBtn);
		}
	}

	//游戏开始， 初始化速度
	private onTouchTapInitBegin(evt: egret.TouchEvent) {
		egret.log("on onTouchTapInitBegin begin");

		for (let ball of this.balls) {
			ball.speedY = -12;
			ball.speedX = 0;
		}

		this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapInitBegin, this);
		this.trigger.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchTapPlaying, this);
		this.trigger.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchTapPlaying, this);
	}

	public update(timeStamp: number): boolean {
		for (let ball of this.balls) {
			ball.update(timeStamp);

			let ballRec = ball.getTransformedBounds(this.stage);

			let deadRec = this.deadZone.getTransformedBounds(this.stage);
			if (deadRec.intersects(ballRec)) {
				this.stage.removeChild(ball);
				let idx = this.balls.indexOf(ball);
				this.balls.splice(idx, 1);

				if (this.isStageFail()) {
					this.stageFail();
				}
			}

			//
			let batRec = this.bat.getTransformedBounds(this.stage);

			if (batRec.intersects(ballRec)) {
				this.bat.onHit(ball);
			}

			if (this.entityMap[WALL] != null) {
				for (let wall of this.entityMap[WALL]) {

					let wallRec = wall.getTransformedBounds(this.stage);

					if (wallRec.intersects(ballRec)) {
						if (ball.collitionTag < timeStamp) {
							(<Wall>wall).onHit(ball);
							ball.collitionTag = timeStamp;
						}
					}
				}
			}


			if (this.entityMap[BRICK] != null) {
				for (let brick of this.entityMap[BRICK]) {

					let brickRec = brick.getTransformedBounds(this.stage);

					if (brickRec.intersects(ballRec)) {
						if (ball.collitionTag < timeStamp) {
							(<Brick>brick).onHit(ball);
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

	}

	private onTouchTapPlaying(evt: egret.TouchEvent) {
		if (this.bat != null) {
			this.bat.x = evt.stageX;

			let originRec = this.bat.getTransformedBounds(GameManager.getInstance().stage);
			let inflateRec = originRec.clone();

			inflateRec.inflate(this.balls[0].width / 2, this.balls[0].height / 2);//计算出碰撞外壳矩形;
			// console.log(inflateRec.left + ";" + inflateRec.right + ";" + inflateRec.top + ";" + inflateRec.bottom);

		}
	}

}