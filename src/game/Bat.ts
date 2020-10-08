class Bat extends RebounceObj implements IConfigurable {

	public constructor(stage: egret.DisplayObjectContainer) {
		super();
		let stageW = stage.stage.stageWidth;
		let stageH = stage.stage.stageHeight;
		this.name = "bat";
		this.graphics.beginFill(0x000079, 1);
		this.graphics.drawRect(0, 0, 100, 10);
		this.width = 100;
		this.height = 10;
		this.x = stageW / 2 - 50;
		this.y = stageH * 0.8;
		this.graphics.endFill();
	}
	//overide
	getName(): string {
		return BAT;
	}

	onHit(target: IMovable) {
		//需要传入全局对象得到相对全局坐标的矩形；
		let originRec = this.getTransformedBounds(GameManager.getInstance().stage);
		let inflateRec = originRec.clone();

		inflateRec.inflate(target.width / 2, target.height / 2);//计算出碰撞外壳矩形;
		//计算反弹
		let intersectPoints = this.calcPoints(inflateRec, target);
		console.log(intersectPoints.length);

		if (intersectPoints.length > 0) {
			let firstP = this.calcFirstIntersecPoint(intersectPoints, target);
			console.log(firstP);

 			if (firstP != null) {
				if (firstP.x == inflateRec.left || firstP.x == inflateRec.right) {
					console.log("reverting x speed");
					
					target.revertXSpeed();
				} else if (firstP.y == inflateRec.top || firstP.y == inflateRec.bottom) {
					//当碰撞发生在板子上，根据碰撞点，对x 方向速度做不同比例的变化,距离中心越远，变化率越大

					let middleX = (inflateRec.left + inflateRec.right) / 2;
					//不等于中间点
					if (firstP.x != middleX) {
						//X轴符号位
						let xSign = target.speedX / Math.abs(target.speedX);
						if ((firstP.x < middleX && target.speedX >= 0)) {
							xSign = -1;
						} else if ((firstP.x > middleX && target.speedX <= 0)) {
							xSign = 1;
						}

						let speed2 = Math.pow(target.speedX, 2) + Math.pow(target.speedY, 2);
						let modX2Middle = Math.abs(middleX - firstP.x);
						let rate = 1 - modX2Middle / inflateRec.width * 2;
						let degree = 4 / 9 * Math.PI * rate + (firstP.x > middleX ? Math.PI / 18 : Math.PI / 2);

						target.speedX = xSign * Math.abs(Math.sqrt(speed2 / (1 + Math.pow(Math.tan(degree), 2))));
						target.speedY = (-1) * Math.abs(Math.tan(degree) * target.speedX);
						if (target.speedY > 0) {
							debugger
						}
					}else{
						//如果刚好是中心点
						target.revertYSpeed();
					}
				}

				if (this.deleteOnHit) {
					let thisIndex = GameManager.getInstance().entityMap[this.getName()].indexOf(this);
					if (thisIndex >= 0) {
						GameManager.getInstance().entityMap[this.getName()].splice(thisIndex, 1);
					}
					// GameManager.getInstance().bricks = GameManager.getInstance().bricks.filter(a => a == this);
					GameManager.getInstance().stage.removeChild(this);
				}
			}
		}
	}

}