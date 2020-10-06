class Bat extends RebounceObj implements IConfigurable{
	
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
	getName():string{
		return BAT;
	}
	
}