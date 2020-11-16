class Bat extends RebounceObj implements IConfigurable {

	onHitted(): void {
		throw new Error("Method not implemented.");
	}

	public constructor() {
		super();

		let config = RES.getRes("myGame_json");

		this.graphics.beginFill(parseInt(config.batColor), 1);
		this.graphics.drawRect(0, 0, config.batWidth, config.batHeight);
		this.width = config.batWidth;
		this.height = config.batHeight;
		this.anchorOffsetX = this.width / 2;
		this.graphics.endFill();
	}
	//overide
	getName(): string {
		return BAT;
	}

	/**
	 * 取得用具计算碰撞的矩形;
	 * @param rec 可选；如果传入则使用此参数返回
	 */
	getHitBox(rec?: egret.Rectangle): egret.Rectangle {
		if (!rec)
			rec = new egret.Rectangle();
		
		let point = GameManager.getInstance().batHolder.localToGlobal(this.x, this.y, egret.Point.create(0, 0));
		//需要设置偏移  否则球撞击判断位置不对；
		rec.setTo(point.x-this.anchorOffsetX, point.y-this.anchorOffsetY, this.width, this.height);

		egret.Point.release(point);
		return rec;
	}


	onHit(target: IMovable) {
		//需要传入全局对象得到相对全局坐标的矩形；
		let originRec = this.getHitBox();
		let inflateRec = originRec.clone();

		inflateRec.inflate(target.width / 2, target.height / 2);//计算出碰撞外壳矩形;
		//计算反弹
		let intersectPoints = this.calcPoints(inflateRec, target);

		if (intersectPoints.length > 0) {
			let firstP = this.calcFirstIntersecPoint(intersectPoints, target);

			if (firstP != null) {
				if (firstP.x == inflateRec.left || firstP.x == inflateRec.right) {

					target.resetXSpeed(firstP.x == inflateRec.right);
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
					} else {
						//如果刚好是中心点
						target.resetYSpeed(false);
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