class Brick extends RebounceObj {

    static picName: string[] = ["BRICK_PEOPLE", "BRICK_GIRL", "BRICK_TSHIRT"];
    static aniName: string[] = ["BRICK_FBI", "BRICK_HUAJI"];

    onHitted(): void {
        //donothing
        let ballNum = GameManager.getInstance().balls.length;
        let bricnNum = GameManager.getInstance().getEntityArray(BRICK).length;
        let rate = Math.pow(ballNum / bricnNum, 2);
        if (Math.random() < rate) {
            let item = new CollectableItem({ x: this.x, y: this.y, speedY: 12, spellId: SpellEnum.MoreBall });

            if (GameManager.getInstance().entityMap[ITEM] == null) {
                GameManager.getInstance().entityMap[ITEM] = [];
            }

            GameManager.getInstance().entityMap[ITEM].push(item);
            GameManager.getInstance().stage.addChild(item);
        }

    }

    public constructor(config: any) {
        super();
        let stageWidth = GameManager.getInstance().stage.stage.stageWidth;
        let stageHeight = GameManager.getInstance().stage.stage.stageHeight;
        this.x = config.x * stageWidth;
        this.y = config.y * stageHeight;
        this.name = this.getName();

        this.deleteOnHit = true;

        let total = Brick.picName.length + Brick.aniName.length;

        let choose = Math.floor(Math.random() * total);
        if (choose < Brick.picName.length) {

            var img: egret.Bitmap = new egret.Bitmap();
            img.texture = RES.getRes(Brick.picName[choose]);
            img.width = config.width * stageWidth;
            img.height = config.height * stageHeight;
            img.fillMode = egret.BitmapFillMode.SCALE;
            this.addChild(img);

        } else {
            const mcFactory: egret.MovieClipDataFactory = GameManager.getInstance().stage.stage['mcFactory'];
            var mc1: egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData(Brick.aniName[choose - Brick.picName.length]));

            mc1.scaleX = config.width * stageWidth / mc1.width;
            mc1.scaleY = config.height * stageHeight / mc1.height;
            this.addChild(mc1);
            mc1.gotoAndPlay(0, -1);
        }


    }

    getName(): string {
        return BRICK;
    }

    onDelete(): void {

        const mcFactory: egret.MovieClipDataFactory = this.stage['mcFactory'];
        var mc1: egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData("BRICK_DEAD"));
        //设置缩放
        let scaleX = this.width / mc1.width;
        let scaleY = this.height / mc1.height;
        mc1.scaleX = scaleX;
        mc1.scaleY = scaleY;
        mc1.x = this.x;
        mc1.y = this.y;

        let stage = this.stage;
        stage.addChild(mc1);
        mc1.gotoAndPlay(0, 1);
        mc1.addEventListener(egret.Event.COMPLETE, () => {
            stage.removeChild(mc1);
        }, mc1);
    }

}

