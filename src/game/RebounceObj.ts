class RebounceObj extends egret.Sprite implements IFlexible {

	onHit(target: IMovable) {
		//需要传入全局对象得到相对全局坐标的矩形；
		let inflateRec = this.getTransformedBounds(GameManager.getInstance().stage).clone();

		inflateRec.inflate(target.width / 2, target.height / 2);//计算出碰撞外壳矩形;
		//计算反弹
		let intersectPoints = this.calcPoints(inflateRec, target.speedY / target.speedX, target.y - target.x * target.speedY / target.speedX);
		if (intersectPoints.length > 0) {
			let firstP = this.calcFirstIntersecPoint(intersectPoints,target);
			if (firstP != null) {
				if (firstP.x == inflateRec.left || firstP.x == inflateRec.right) {
					target.revertXSpeed();
				} else if (firstP.y == inflateRec.top || firstP.y == inflateRec.bottom) {
					target.revertYSpeed();
				}

				// let idx =GameManager.getInstance().bricks.indexOf(this);
				// GameManager.getInstance().bricks[idx]=null;
				GameManager.getInstance().bricks=GameManager.getInstance().bricks.filter(a=>a==this);
				GameManager.getInstance().stage.removeChild(this);
			}
		}
	}

	public constructor() {
		super();
	}

	//计算直线与矩形的交点
	private calcPoints(rec: egret.Rectangle, k: number, b: number): egret.Point[] {
		let result: egret.Point[] = [];

		let left = rec.left;
		let bottom = rec.bottom;
		let right = rec.right;
		let top = rec.top;

		//需要特殊处理 垂直的情况
		if (k != Number.POSITIVE_INFINITY) {
			let leftPoint = new egret.Point(left, k * left + b);
			let rightPoint = new egret.Point(right, k * right + b);
			result.push(leftPoint);
			result.push(rightPoint);
		}
		//平行的情况则不处理
		if (k != 0) {
			let topPoint = new egret.Point((top - b) / k, top);
			let bottomPoint = new egret.Point((bottom - b) / k, bottom);
			result.push(topPoint);
			result.push(bottomPoint);
		}

		let finalResult: egret.Point[] = [];
		for (let p of result) {
			if (!(p.x < left || p.x > right || p.y < top || p.y > bottom)) {
				finalResult.push(p);
			}
		}
		return finalResult;
	}

	//计算第一个碰撞点
	private calcFirstIntersecPoint(points: egret.Point[], target: IMovable): egret.Point {

		if (points.length < 2)
			return null;

		let p1 = points[0];
		let p2 = points[1];

		let kBall = Number.POSITIVE_INFINITY;
		if (target.speedX != 0) {
			target.speedY / target.speedX;
		}
		let k = Number.POSITIVE_INFINITY;
		if (p2.x != p1.x) {
			let k = (p2.y - p1.y) / (p2.x - p1.x);
		}

		if (kBall == Number.POSITIVE_INFINITY && k == Number.POSITIVE_INFINITY) {
			return p2.y > p1.y ? p2 : p1;
		} else if (kBall == Number.POSITIVE_INFINITY || k == Number.POSITIVE_INFINITY) {
			return null;
		} else {
			if (kBall == k) {
				return p1;//斜率相同，p1->p2;
			} else if (kBall == -k) {
				return p2;//相反，p2->p1;
			} else {
				return null;
			}
		}
	}
}