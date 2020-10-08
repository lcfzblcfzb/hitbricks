var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var RebounceObj = (function (_super) {
    __extends(RebounceObj, _super);
    function RebounceObj() {
        var _this = _super.call(this) || this;
        _this.deleteOnHit = false;
        return _this;
    }
    RebounceObj.prototype.onHit = function (target) {
        //需要传入全局对象得到相对全局坐标的矩形；
        var inflateRec = this.getTransformedBounds(GameManager.getInstance().stage).clone();
        inflateRec.inflate(target.width / 2, target.height / 2); //计算出碰撞外壳矩形;
        //计算反弹
        var intersectPoints = this.calcPoints(inflateRec, target);
        if (intersectPoints.length > 0) {
            var firstP = this.calcFirstIntersecPoint(intersectPoints, target);
            if (firstP != null) {
                if (firstP.x == inflateRec.left || firstP.x == inflateRec.right) {
                    target.revertXSpeed();
                }
                else if (firstP.y == inflateRec.top || firstP.y == inflateRec.bottom) {
                    target.revertYSpeed();
                }
                if (this.deleteOnHit) {
                    var thisIndex = GameManager.getInstance().entityMap[this.getName()].indexOf(this);
                    if (thisIndex >= 0) {
                        GameManager.getInstance().entityMap[this.getName()].splice(thisIndex, 1);
                    }
                    // GameManager.getInstance().bricks = GameManager.getInstance().bricks.filter(a => a == this);
                    GameManager.getInstance().stage.removeChild(this);
                }
            }
        }
    };
    //计算直线与矩形的交点
    RebounceObj.prototype.calcPoints = function (rec, target) {
        var result = [];
        var finalResult = [];
        var left = rec.left;
        var bottom = rec.bottom;
        var right = rec.right;
        var top = rec.top;
        if (target.speedX != 0) {
            var k = target.speedY / target.speedX;
            var b = target.y - target.x * k;
            //先计算函数交点（即矩形的4条边当作直线处理）
            //需要特殊处理 垂直的情况
            if (k != Number.POSITIVE_INFINITY && k != Number.NEGATIVE_INFINITY) {
                var leftPoint = new egret.Point(left, k * left + b);
                var rightPoint = new egret.Point(right, k * right + b);
                if (leftPoint.equals(rightPoint)) {
                    result.push(leftPoint);
                }
                else {
                    result.push(leftPoint);
                    result.push(rightPoint);
                }
            }
            //平行的情况则不处理
            if (k != 0) {
                var topPoint = new egret.Point((top - b) / k, top);
                var bottomPoint = new egret.Point((bottom - b) / k, bottom);
                if (topPoint.equals(bottomPoint)) {
                    result.push(topPoint);
                }
                else {
                    result.push(topPoint);
                    result.push(bottomPoint);
                }
            }
        }
        else {
            //speedX =0 ，轨迹是一条垂线，只计算上下两个触点
            var topPoint = new egret.Point(target.x, top);
            var bottomPoint = new egret.Point(target.x, bottom);
            result.push(topPoint);
            result.push(bottomPoint);
        }
        for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
            var p = result_1[_i];
            if (!(p.x < left || p.x > right || p.y < top || p.y > bottom)) {
                finalResult.push(p);
            }
        }
        return finalResult;
    };
    //计算第一个碰撞点
    RebounceObj.prototype.calcFirstIntersecPoint = function (points, target) {
        if (points.length < 2)
            return null;
        var p1 = points[0];
        var p2 = points[1];
        var kBall = Number.POSITIVE_INFINITY;
        if (target.speedX != 0) {
            kBall = target.speedY / target.speedX;
        }
        var k = Number.POSITIVE_INFINITY;
        if (p2.x != p1.x) {
            k = (p2.y - p1.y) / (p2.x - p1.x);
        }
        if (kBall == Number.POSITIVE_INFINITY && k == Number.POSITIVE_INFINITY) {
            return p2.y > p1.y ? p2 : p1;
        }
        else if (kBall == Number.POSITIVE_INFINITY || k == Number.POSITIVE_INFINITY) {
            return null;
        }
        else {
            if (kBall * k > 0) {
                //如果是在内部（可能出现），判断下坐标
                if (target.x > p1.x) {
                    return p2;
                }
                return p1; //斜率方向相同，p1->p2;
            }
            else if (kBall * k < 0) {
                if (target.x < p2.x) {
                    return p1;
                }
                return p2; //方向相反，p2->p1;
            }
            else {
                return null;
            }
        }
    };
    return RebounceObj;
}(egret.Sprite));
__reflect(RebounceObj.prototype, "RebounceObj", ["IFlexible", "IConfigurable"]);
//# sourceMappingURL=RebounceObj.js.map