class GameManager {
	private constructor() {
	}

	static gm = new GameManager();

	bat: Bat;
	balls: Ball[] = [];
	bricks: Array<Brick> = new Array();
	stage: egret.DisplayObjectContainer;
	trigger: egret.Shape;

	static getInstance(): GameManager {
		return GameManager.gm;
	}

	init(stage: egret.DisplayObjectContainer): void {
		//TODO 初始化
		this.stage = stage;

		this.bat = new Bat(stage);
		this.stage.addChild(this.bat);

		let ball = new Ball(this.bat.x + 50, this.bat.y - 20);
		this.balls.push(ball);
		this.stage.addChild(ball);

		let demo =RES.getRes("demo_json");

		for(let config of demo.bricks){
			let brick: Brick = Brick.createByConfig(config);
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
	}

	//游戏开始， 初始化速度
	private onTouchTapInitBegin(evt: egret.TouchEvent) {
		egret.log("on onTouchTapInitBegin begin");

		for (let ball of this.balls) {
			ball.speedY = -3;
			ball.speedX = 5;
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

			for (let brick of this.bricks) {

				let brickRec = brick.getTransformedBounds(this.stage);

				if (brickRec.intersects(ballRec)) {
					brick.onHit(ball);
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