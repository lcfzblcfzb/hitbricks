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
var Brick = (function (_super) {
    __extends(Brick, _super);
    function Brick(config) {
        var _this = _super.call(this) || this;
        var stageWidth = GameManager.getInstance().stage.stage.stageWidth;
        var stageHeight = GameManager.getInstance().stage.stage.stageHeight;
        _this.x = config.x * stageWidth;
        _this.y = config.y * stageHeight;
        _this.name = _this.getName();
        _this.deleteOnHit = true;
        var total = Brick.picName.length + Brick.aniName.length;
        var choose = Math.floor(Math.random() * total);
        if (choose < Brick.picName.length) {
            var img = new egret.Bitmap();
            img.texture = RES.getRes(Brick.picName[choose]);
            img.width = config.width * stageWidth;
            img.height = config.height * stageHeight;
            img.fillMode = egret.BitmapFillMode.SCALE;
            _this.addChild(img);
        }
        else {
            var mcFactory = GameManager.getInstance().stage.stage['mcFactory'];
            var mc1 = new egret.MovieClip(mcFactory.generateMovieClipData(Brick.aniName[choose - Brick.picName.length]));
            mc1.scaleX = config.width * stageWidth / mc1.width;
            mc1.scaleY = config.height * stageHeight / mc1.height;
            _this.addChild(mc1);
            mc1.gotoAndPlay(0, -1);
        }
        return _this;
    }
    Brick.prototype.getName = function () {
        return BRICK;
    };
    Brick.prototype.onDelete = function () {
        var mcFactory = this.stage['mcFactory'];
        var mc1 = new egret.MovieClip(mcFactory.generateMovieClipData("BRICK_DEAD"));
        //设置缩放
        var scaleX = this.width / mc1.width;
        var scaleY = this.height / mc1.height;
        mc1.scaleX = scaleX;
        mc1.scaleY = scaleY;
        mc1.x = this.x;
        mc1.y = this.y;
        var stage = this.stage;
        stage.addChild(mc1);
        mc1.gotoAndPlay(0, 1);
        mc1.addEventListener(egret.Event.COMPLETE, function () {
            stage.removeChild(mc1);
        }, mc1);
    };
    Brick.picName = ["BRICK_PEOPLE", "BRICK_GIRL", "BRICK_TSHIRT"];
    Brick.aniName = ["BRICK_FBI", "BRICK_HUAJI"];
    return Brick;
}(RebounceObj));
__reflect(Brick.prototype, "Brick");
//# sourceMappingURL=Brick.js.map