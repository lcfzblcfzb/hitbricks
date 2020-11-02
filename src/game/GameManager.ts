
class GameManager {
	private constructor() {
	}

	static gm = new GameManager();

	bat: Bat;
	balls: Ball[] = [];
	stage: egret.DisplayObjectContainer;
	deadZone: egret.Shape;//死亡判定区域；
	touchZone: egret.Shape;
	entityMap: { [key: number]: Array<IConfigurable> } = {};
	finished: boolean;

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
		this.finished = true;
		console.log("stage success");
		this.stage.dispatchEvent(GameProcessEvent.newInstance("STAGE_END", true));
		if (StageMng.getInstance().isLastStage()) {
			this.stage.dispatchEvent(GameProcessEvent.newInstance("GAME_END", true));
			//游戏结束；
		}

	}
	//是否关卡成功完成
	isStageSuccess(): boolean {
		if (!this.finished) {
			if (this.entityMap[BRICK] != null) {
				return this.entityMap[BRICK].length <= 0;
			} else {
				return true;
			}
		} else {
			return false;
		}
	}

	//是否关卡失败
	isStageFail(): boolean {
		if (!this.finished) {
			return this.balls.length <= 0;
		} else {
			return false;
		}
	}

	//关卡失败结束
	stageFail() {
		this.finished = true;
		this.stage.dispatchEvent(GameProcessEvent.newInstance("STAGE_END", false));
		// gameOver
		let event = GameProcessEvent.newInstance("GAME_END", false);
		this.stage.dispatchEvent(event);
	}

	/**
	 * 重置下参数
	 */
	private _resetFields() {
		this.balls = [];
		this.entityMap = {};
		this.touchZone = null;
		this.bat = null;
		this.finished = false;//标记为，标记本局游戏是否完结了，完结之后不会触发其他的效果（成功、失败事件只会触发一次）
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
					if (DEBUG) {
						let hitRec = new egret.Shape();
						let inflateRec = configable.getTransformedBounds(GameManager.getInstance().stage).clone();
						//DEBUG------
						inflateRec.inflate(ball.width / 2, ball.height / 2);//计算出碰撞外壳矩形;
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
		this.touchZone.y = 2*this.bat.y-this.stage.stage.stageHeight;
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

		if (DEBUG) {
			let gmBtn = new eui.Button();
			gmBtn.label = "over";
			gmBtn.addEventListener("touchEnd", (e) => {
				this.stageSuccess();
				e.stopPropagation();
			}, this);
			this.stage.addChild(gmBtn);
			this.stage.addChild(this.debugLine);

			this.debugLine.graphics.lineStyle(0.5, 0xff3814, 0.5);

		}
	}

	//游戏开始， 初始化速度,移除准备事件的回调，增加游戏中的事件监听
	private onTouchTapInitBegin(evt: egret.TouchEvent) {
		egret.log("on onTouchTapInitBegin begin");

		let config = RES.getRes("myGame_json");

		for (let ball of this.balls) {
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
	}

	//游戏开始，玩家按下手指还没抬起的事件回调
	private onInitTouchMoveListener(evt: egret.TouchEvent): void {
		if (this.bat != null) {
			this.bat.x = evt.stageX;

			for (let ball of this.balls) {
				ball.x = this.bat.x;
			}

		}
	}

	debugLine: egret.Shape = new egret.Shape();
	public update(timeStamp: number): boolean {
		for (let ball of this.balls) {

			this.debugLine.graphics.moveTo(ball.x, ball.y);
			ball.update(timeStamp);
			this.debugLine.graphics.lineTo(ball.x, ball.y);
			let ballDebugRec = ball.getTransformedBounds(this.stage);
			this.debugLine.graphics.drawRect(ballDebugRec.x, ballDebugRec.y, ballDebugRec.width, ballDebugRec.height);
			this.debugLine.graphics.endFill();

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

	//移动事件监听;
	private onTouchTapPlaying(evt: egret.TouchEvent) {
		if (this.bat != null) {
			this.bat.x = evt.stageX;
		}
	}

}