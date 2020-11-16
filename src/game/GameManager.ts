
class GameManager {
	private constructor() {
	}

	static gm = new GameManager();

	batHolder: egret.DisplayObjectContainer;//基准bat;玩家触摸时候处于中心点触点的bat
	bats: Bat[] = [];//所有bat；包括基准bat
	balls: Ball[] = [];
	stage: egret.DisplayObjectContainer;
	deadZone: egret.Shape;//死亡判定区域；
	touchZone: egret.Shape;
	entityMap: { [key: string]: Array<IConfigurable> } = {};
	finished: boolean;
	_batTouchPoint: egret.Point;

	static getInstance(): GameManager {
		return GameManager.gm;
	}

	/**
	 * 取得实体数组
	 * @param key entitymap 的 key键
	 */
	getEntityArray(key: string): Array<IConfigurable> {
		return this.entityMap[key];
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
		this.bats = [];
		this.batHolder = null;
		this._batTouchPoint = null;
		this.finished = false;//标记为，标记本局游戏是否完结了，完结之后不会触发其他的效果（成功、失败事件只会触发一次）
		if (this.stage != null)
			this.stage.removeChildren();
	}

	//初始化关卡数据;
	initStage(stageConfig) {
		//重置下关卡
		this._resetFields();

		this.batHolder = new egret.DisplayObjectContainer();
		this.stage.addChild(this.batHolder);
		this.batHolder.x = this.stage.width / 2;
		this.batHolder.y = this.stage.height * 0.8;

		let initBat: Bat = new Bat();
		this.batHolder.addChild(initBat);
		this.bats.push(initBat);

		console.log("bat height" + this.batHolder.y);

		this.stage.addChild(this.batHolder);

		let ball = new Ball(this.batHolder.x, this.batHolder.y - 20);
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
		this.touchZone.graphics.drawRect(0, 0, this.stage.stage.stageWidth, 2 * (this.stage.stage.stageHeight - this.batHolder.y));
		this.touchZone.graphics.endFill();
		this.touchZone.x = 0;
		this.touchZone.y = 2 * this.batHolder.y - this.stage.stage.stageHeight;
		this.touchZone.width = this.stage.width;
		this.touchZone.touchEnabled = true;
		this.stage.addChild(this.touchZone);

		let skillABtn = new eui.Button();
		skillABtn.skinName = "resource/eui_skins/SpellBtnSkin.exml";
		skillABtn.x = 0;
		skillABtn.y = 2 * this.batHolder.y - this.stage.stage.stageHeight;

		skillABtn.addEventListener("touchEnd", () => {
			PlayerMng.getInstance().castSpell(1);
		}, this)
		this.stage.addChild(skillABtn);

		let skillBBtn = new eui.Button();
		skillBBtn.skinName = "resource/eui_skins/SpellBtnSkin.exml";
		skillBBtn.x = this.stage.width - skillBBtn.width;
		skillBBtn.y = 2 * this.batHolder.y - this.stage.stage.stageHeight;
		skillBBtn.addEventListener("touchEnd", () => {
			PlayerMng.getInstance().castSpell(2);
		}, this)
		this.stage.addChild(skillBBtn);

		this.deadZone = new egret.Shape();
		this.deadZone.name = "deadZone";
		this.deadZone.graphics.beginFill(0x191970, 0.2);
		this.deadZone.graphics.drawRect(0, 0, this.stage.width, 100);
		this.deadZone.graphics.endFill();
		this.deadZone.x = 0;
		this.deadZone.y = this.batHolder.y + (this.stage.height - this.batHolder.y) / 2;

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
		this.touchZone.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchTapEnd, this);
	}

	//游戏开始，玩家按下手指还没抬起的事件回调
	private onInitTouchMoveListener(evt: egret.TouchEvent): void {
		if (this.bats != null) {

			this.batHolder.x = evt.stageX;

			for (let ball of this.balls) {
				ball.x = this.batHolder.x;
			}

		}
	}

	debugLine: egret.Shape = new egret.Shape();
	public update(timeStamp: number): boolean {

		this._updateEachBall(timeStamp);

		this._updateEachCollectableItem(timeStamp);

		this._updateBatPosition(timeStamp);

		return false;

	}

	/**
	 * 更新bat 位置
	 * @param timeStamp 
	 */
	private _updateBatPosition(timeStamp: number): void {

		if (this._batTouchPoint != null) {

			if (this._batTouchPoint.x > this.batHolder.x) {

				let result = this.batHolder.x + PlayerMng.getInstance().batSpeed;
				if (result > this._batTouchPoint.x) {
					result = this._batTouchPoint.x;
				}
				this.batHolder.x = result;

			} else if (this._batTouchPoint.x < this.batHolder.x) {

				let result = this.batHolder.x - PlayerMng.getInstance().batSpeed;

				if (result < this._batTouchPoint.x) {
					result = this._batTouchPoint.x;
				}
				this.batHolder.x = result;
			}

		}


	}


	/**
	 * 球体更新位置/碰撞检测
	 * @param timeStamp 
	 */
	private _updateEachBall(timeStamp: number) {
		for (let ballIdx in this.balls) {
			let ball = this.balls[ballIdx];

			//更新位置
			if (DEBUG) {
				this.debugLine.graphics.moveTo(ball.x, ball.y);
				ball.update(timeStamp);
				this.debugLine.graphics.lineTo(ball.x, ball.y);
				let ballDebugRec = ball.getTransformedBounds(this.stage);
				this.debugLine.graphics.drawRect(ballDebugRec.x, ballDebugRec.y, ballDebugRec.width, ballDebugRec.height);
				this.debugLine.graphics.endFill();
			}

			if (RELEASE) {
				ball.update(timeStamp);
			}

			let ballRec = ball.getTransformedBounds(this.stage);

			//消亡区域碰撞检测
			let deadRec = this.deadZone.getTransformedBounds(this.stage);
			if (deadRec.intersects(ballRec)) {
				this.stage.removeChild(ball);
				let idx = this.balls.indexOf(ball);
				this.balls.splice(idx, 1);

				if (this.isStageFail()) {
					this.stageFail();
				}
			}

			//拍子的碰撞检测
			if (this.bats != null) {
				for (let batIdx in this.bats) {

					let tmpBat = this.bats[batIdx];

					if (tmpBat.getHitBox().intersects(ballRec)) {
						tmpBat.onHit(ball);
					}

				}
			}

			//wall 碰撞检测
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

			//brick 碰撞检测
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
	}

	/**
	 * 掉落的可收集道具
	 * @param timeStamp 
	 */
	private _updateEachCollectableItem(timeStamp: number) {
		//掉落buff
		if (this.entityMap[ITEM] != null) {

			for (let itemId in this.entityMap[ITEM]) {

				let item = this.getEntityArray(ITEM)[itemId] as CollectableItem;
				if (item.deleted)
					continue;

				item.update(timeStamp);
				let itemRec = item.getTransformedBounds(this.stage);

				for (let batIdx in this.bats) {

					let tmpBat = this.bats[batIdx];

					if (tmpBat.getHitBox().intersects(itemRec)) {
						item.onHitted(timeStamp);
					}

				}

			}

			if (CollectableItem.toDeleteList.length > 0) {

				for (let i = 0; i < CollectableItem.toDeleteList.length; i++) {
					let item = CollectableItem.toDeleteList.pop();
					CollectableItem.removeFromGame(item);
				}

			}

		}
	}

	//移动事件监听;
	private onTouchTapPlaying(evt: egret.TouchEvent) {
		// if (this.batHolder != null) {
		// 	this.batHolder.x = evt.stageX;
		// }
		if (this._batTouchPoint == null) {
			this._batTouchPoint = egret.Point.create(evt.stageX, evt.stageY);
		} else {
			if (this._batTouchPoint.x != evt.stageX) {
				this._batTouchPoint.setTo(evt.stageX, evt.stageY);
			}
		}
	}

	private onTouchTapEnd(evt: egret.TouchEvent) {
		if (this._batTouchPoint != null) {
			egret.Point.release(this._batTouchPoint);
			this._batTouchPoint = null;
		}
	}

}