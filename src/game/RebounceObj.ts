abstract class RebounceObj extends egret.Sprite implements IFlexible, IConfigurable {

	static count: number = 0;
	deleteOnHit: boolean = false;

	onHit(target: IMovable) {

		let startTime = new Date().getTime();
		//需要传入全局对象得到相对全局坐标的矩形；
		let inflateRec = this.getTransformedBounds(GameManager.getInstance().stage).clone();

		inflateRec.inflate(target.width / 2, target.height / 2);//计算出碰撞外壳矩形;
		//计算反弹
		let intersectPoints = this.calcPoints(inflateRec, target);
		if (intersectPoints.length > 0) {

			let firstP = this.calcFirstIntersecPoint(intersectPoints, target);

			if (firstP != null) {
				if (DEBUG) {

					// console.log("stagewidth:" + this.stage.width);
					// console.log("stageheight:" + this.stage.height);
					// #FFD700
					// let hitRec = new egret.Shape();
					// hitRec.x = firstP.x;
					// hitRec.y = firstP.y;
					// hitRec.graphics.lineStyle(0, 0xFFD700);
					// hitRec.graphics.beginFill(0xFFD700, 2);
					// hitRec.graphics.drawCircle(0, 0, 2);
					// hitRec.graphics.endFill();
					// this.stage.addChild(hitRec);


					var label: egret.TextField = new egret.TextField();
					label.text = (RebounceObj.count++).toString();
					label.x = firstP.x;
					label.y = firstP.y;
					label.width = 32;
					label.height = 32;
					label.size = 15;
					this.stage.addChild(label);
				}
				if (firstP.x == inflateRec.left || firstP.x == inflateRec.right) {

					if (DEBUG)
						console.log("resettingXSpeed" + (firstP.x == inflateRec.right));
					target.resetXSpeed(firstP.x == inflateRec.right);
				} else if (firstP.y == inflateRec.top || firstP.y == inflateRec.bottom) {
					if (DEBUG)
						console.log("resettingYSpeed" + (firstP.y == inflateRec.bottom));
					target.resetYSpeed(firstP.y == inflateRec.bottom);
				}

				if (this.deleteOnHit) {

					this.onDelete();
					let thisIndex = GameManager.getInstance().entityMap[this.getName()].indexOf(this);
					if (thisIndex >= 0) {
						GameManager.getInstance().entityMap[this.getName()].splice(thisIndex, 1);
					}
					// GameManager.getInstance().bricks = GameManager.getInstance().bricks.filter(a => a == this);
					GameManager.getInstance().stage.removeChild(this);
				}
			}
		}

		if (DEBUG)
			console.log("onHit Cost:" + (new Date().getTime() - startTime) + "ms");
	}

	abstract getName(): string;
	onDelete(): void { };

	public constructor() {
		super();
	}

	//计算直线与矩形的交点
	protected calcPoints(rec: egret.Rectangle, target: IMovable): egret.Point[] {
		let result: egret.Point[] = [];
		let finalResult: egret.Point[] = [];

		let left = rec.left;
		let bottom = rec.bottom;
		let right = rec.right;
		let top = rec.top;

		//如果不是垂直
		if (target.speedX != 0) {
			//如果平行的情况，speedY是等于0，k 也等于0
			let k = target.speedY / target.speedX;
			let b = target.y - target.x * k;
			//先计算函数交点（即矩形的4条边当作直线处理）
			if (k != Number.POSITIVE_INFINITY && k != Number.NEGATIVE_INFINITY) {
				let leftPoint = new egret.Point(left, k * left + b);
				let rightPoint = new egret.Point(right, k * right + b);
				if (leftPoint.equals(rightPoint)) {
					result.push(leftPoint);
				} else {
					result.push(leftPoint);
					result.push(rightPoint);
				}
			}
			//平行的情况则不处理
			if (k != 0) {
				let topPoint = new egret.Point((top - b) / k, top);
				let bottomPoint = new egret.Point((bottom - b) / k, bottom);
				if (topPoint.equals(bottomPoint)) {
					result.push(topPoint);
				} else {
					result.push(topPoint);
					result.push(bottomPoint);
				}
			}
		} else {
			//speedX =0 ，轨迹是一条垂线，只计算上下两个触点
			let topPoint = new egret.Point(target.x, top);
			let bottomPoint = new egret.Point(target.x, bottom);
			result.push(topPoint);
			result.push(bottomPoint);
		}

		//只是把矩形的四周代入进行运算，最后过滤出 矩形上的点
		for (let p of result) {
			if (!(p.x < left || p.x > right || p.y < top || p.y > bottom)) {
				finalResult.push(p);
			}
		}
		return finalResult;
	}

	//计算第一个碰撞点
	protected calcFirstIntersecPoint(points: egret.Point[], target: IMovable): egret.Point {

		if (points.length < 2)
			return null;

		let p1 = points[0];
		let p2 = points[1];

		if (target.speedX != 0 || target.speedY != 0) {

			if (target.speedY > 0) {
				return p1.y > p2.y ? p2 : p1;
			} else if (target.speedY < 0) {
				return p1.y > p2.y ? p1 : p2;
			} else if (target.speedX > 0) {
				return p1.x > p2.x ? p2 : p1;
			} else if (target.speedX < 0) {
				return p1.x > p2.x ? p1 : p2;
			}
		} else {
			console.log("ball speedX and speedY =0");
			return null;
		}
		// let kBall = Number.POSITIVE_INFINITY;
		// 		if (target.speedX != 0) {
		// 			kBall = target.speedY / target.speedX;
		// 		}
		// 		let k = Number.POSITIVE_INFINITY;
		// 		if (p2.x != p1.x) {
		// 			k = (p2.y - p1.y) / (p2.x - p1.x);
		// 		}
		// if (kBall == Number.POSITIVE_INFINITY && k == Number.POSITIVE_INFINITY) {
		// 	return p2.y > p1.y ? p2 : p1;
		// } else if (kBall == Number.POSITIVE_INFINITY || k == Number.POSITIVE_INFINITY) {
		// 	return null;
		// } else {
		// 	if (kBall * k > 0) {
		// 		//如果是在内部（可能出现），判断下坐标
		// 		if (target.x > p1.x) {
		// 			return p2;
		// 		}
		// 		return p1;//斜率方向相同，p1->p2;
		// 	} else if (kBall * k < 0) {
		// 		if (target.x < p2.x) {
		// 			return p1;
		// 		}
		// 		return p2;//方向相反，p2->p1;
		// 	} else {
		// 		return null;
		// 	}
		// }
	}
}