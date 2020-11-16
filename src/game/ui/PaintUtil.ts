class PaintUtil {


    public static createDisplayObj(name: string): egret.DisplayObject {

        let res = RES.getRes(name);

        if (res) {
            var img: egret.Bitmap = new egret.Bitmap();
            img.texture = res;
            return img;
        }

        const mcFactory: egret.MovieClipDataFactory = GameManager.getInstance().stage.stage['mcFactory'];

        let data = mcFactory.generateMovieClipData(name);
        if (data.textureData) {
            var mc1: egret.MovieClip = new egret.MovieClip(data);
            mc1.gotoAndPlay(0, -1);
            return mc1;
        }

        let shp = this.paintDebugShape(0, 0, 32, 32, 1, 0xff0022);
        return shp;
    }

    public static paintDebugShape(x: number, y: number, width: number, height: number, alpha: number, color: number): egret.Shape {
        let shp = new egret.Shape();
        shp.graphics.beginFill(color, alpha);
        shp.graphics.drawRect(x, y, width, height);
        shp.width = width;
        shp.height = height;
        shp.graphics.endFill();
        return shp;
    }


}

