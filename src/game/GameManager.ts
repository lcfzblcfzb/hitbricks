class GameManager {
	private constructor() {
	}

	static gm = new GameManager();

	bat: Bat;
	balls: Ball[] = [];
	bricks: Array<Brick> = new Array();
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

	init(stage: egret.DisplayObjectContainer): void {
		//TODO 初始化
		this.stage = stage;

		this.bat = new Bat(stage);
		this.stage.addChild(this.bat);

		let ball = new Ball(this.bat.x + 50, this.bat.y - 20);
		this.balls.push(ball);
		this.stage.addChild(ball);

		let demo = RES.getRes("demo_json");

		for (let config of demo.configurables) {
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
			ball.speedY = -3;
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
				ball.revertYSpeed();
			}

			if (this.entityMap[BRICK] != null) {
				for (let brick of this.entityMap[BRICK]) {

					let brickRec = brick.getTransformedBounds(this.stage);

					if (brickRec.intersects(ballRec)) {
						(<Brick>brick).onHit(ball);
					}
				}
			}
		}

		return false;

	}

	private onTouchTapPlaying(evt: egret.TouchEvent) {
		if (this.bat != null) {
			this.bat.x = evt.stageX;
		}
	}

}