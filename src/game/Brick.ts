class Brick extends RebounceObj{
	
	public constructor(stage: egret.DisplayObjectContainer) {
		super();
		this.name = "brick";
        this.graphics.beginFill(0x00ff00, 1);
        this.graphics.drawRect(0, 0, 10, 10);
        this.graphics.endFill();
        this.x = stage.stage.stageWidth / 2;
        this.y = stage.stage.stageHeight * 0.1;
	}



}