
class Ball extends egret.Sprite implements IMovable, IConfigurable {

	speedX: number = 0;
	speedY: number = 0;
	canMove: boolean = true;
	backStage: egret.DisplayObjectContainer;
	collitionTag = -1;

	public constructor(x: number, y: number) {
		super();
		this.name = "ball";
		this.x = x;
		this.y = y;

		let config = RES.getRes("myGame_json");
		this.backStage = GameManager.getInstance().stage;

		let configWidth = config.ballRadius * 2;
		let configHeight = config.ballRadius * 2;
		this.width = configWidth
		this.height = configHeight
		this.anchorOffsetX = config.ballRadius;
		this.anchorOffsetY = config.ballRadius;
		
		const mcFactory: egret.MovieClipDataFactory = this.backStage.stage['mcFactory'];
		var mc1: egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData("ball"));
		//设置缩放
		let scaleX = this.width / mc1.width;
		let scaleY = this.height  / mc1.height;
		mc1.scaleX = scaleX;
		mc1.scaleY = scaleY;
		this.addChild(mc1);

		mc1.gotoAndPlay(0, -1);

	}

	update(timeStamp: number): void {

		this.x += this.speedX;
		this.y += this.speedY;

		//保证不会跑出画布;
		if (this.y <= 0 && this.speedY < 0 || this.y > this.backStage.height && this.speedY > 0) {
			this.speedY = -this.speedY;
		}
		if (this.x <= 0 && this.speedX < 0) {
			this.speedX = - this.speedX;
		} else if (this.x > this.backStage.width && this.speedX > 0) {
			this.speedX = - this.speedX;
		}

	}

	resetXSpeed(direction: boolean): void {
		if (direction) {
			this.speedX = Math.abs(this.speedX);
		} else {
			this.speedX = -Math.abs(this.speedX);
		}

	}

	resetYSpeed(direction: boolean): void {
		if (direction) {
			this.speedY = Math.abs(this.speedY);
		} else {
			this.speedY = -Math.abs(this.speedY);
		}
	}
	//override
	getName(): string {
		return BALL;
	}
}