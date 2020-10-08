class Ball extends egret.Sprite implements IMovable,IConfigurable {

	speedX: number = 0;
	speedY: number = 0;
	canMove: boolean = true;
	backStage:egret.DisplayObjectContainer;

	public constructor(x: number, y: number) {
		super();
		this.name = "ball";
		this.x = x;
		this.y = y;
		this.graphics.lineStyle(1, 0x00ff00);
		this.graphics.beginFill(0xff0000, 1);
		this.graphics.drawCircle(0, 0, 10);
		this.graphics.endFill();
		this.backStage = GameManager.getInstance().stage;
	}


	update(timeStamp: number) :void{
		this.x += this.speedX;
		this.y += this.speedY;

		if (this.y <= 0 || this.y > this.backStage.height) {
			this.speedY = -this.speedY;	
		}
		if (this.x <= 0 || this.x > this.backStage.width) {
			this.speedX = -this.speedX;
		}
		console.log(this.x+";"+this.y+";"+this.speedX+";"+this.speedY);
		
	}

	revertXSpeed(): void {
		this.speedX = -this.speedX;
	}

	revertYSpeed(): void {
		this.speedY = -this.speedY;
	}
	//override
	getName():string{
		return BALL;
	}
}