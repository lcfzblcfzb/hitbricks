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
var Bat = (function (_super) {
    __extends(Bat, _super);
    function Bat(stage) {
        var _this = _super.call(this) || this;
        var stageW = stage.stage.stageWidth;
        var stageH = stage.stage.stageHeight;
        _this.name = "bat";
        var config = RES.getRes("myGame_json");
        _this.graphics.beginFill(parseInt(config.batColor), 1);
        _this.graphics.drawRect(0, 0, config.batWidth, config.batHeight);
        _this.width = config.batWidth;
        _this.height = config.batHeight;
        _this.x = stageW / 2;
        _this.y = stageH * 0.8;
        _this.anchorOffsetX = _this.width / 2;
        _this.graphics.endFill();
        return _this;
    }
    //overide
    Bat.prototype.getName = function () {
        return BAT;
    };
    Bat.prototype.onHit = function (target) {
        //需要传入全局对象得到相对全局坐标的矩形；
        var originRec = this.getTransformedBounds(GameManager.getInstance().stage);
        var inflateRec = originRec.clone();
        inflateRec.inflate(target.width / 2, target.height / 2); //计算出碰撞外壳矩形;
        //计算反弹
        var intersectPoints = this.calcPoints(inflateRec, target);
        if (intersectPoints.length > 0) {
            var firstP = this.calcFirstIntersecPoint(intersectPoints, target);
            if (firstP != null) {
                if (firstP.x == inflateRec.left || firstP.x == inflateRec.right) {
                    target.resetXSpeed(firstP.x == inflateRec.right);
                }
                else if (firstP.y == inflateRec.top || firstP.y == inflateRec.bottom) {
                    //当碰撞发生在板子上，根据碰撞点，对x 方向速度做不同比例的变化,距离中心越远，变化率越大
                    var middleX = (inflateRec.left + inflateRec.right) / 2;
                    //不等于中间点
                    if (firstP.x != middleX) {
                        //X轴符号位
                        var xSign = target.speedX / Math.abs(target.speedX);
                        if ((firstP.x < middleX && target.speedX >= 0)) {
                            xSign = -1;
                        }
                        else if ((firstP.x > middleX && target.speedX <= 0)) {
                            xSign = 1;
                        }
                        var speed2 = Math.pow(target.speedX, 2) + Math.pow(target.speedY, 2);
                        var modX2Middle = Math.abs(middleX - firstP.x);
                        var rate = 1 - modX2Middle / inflateRec.width * 2;
                        var degree = 4 / 9 * Math.PI * rate + (firstP.x > middleX ? Math.PI / 18 : Math.PI / 2);
                        target.speedX = xSign * Math.abs(Math.sqrt(speed2 / (1 + Math.pow(Math.tan(degree), 2))));
                        target.speedY = (-1) * Math.abs(Math.tan(degree) * target.speedX);
                        if (target.speedY > 0) {
                            debugger;
                        }
                    }
                    else {
                        //如果刚好是中心点
                        target.resetYSpeed(false);
                    }
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
    return Bat;
}(RebounceObj));
__reflect(Bat.prototype, "Bat");
//# sourceMappingURL=Bat.js.map