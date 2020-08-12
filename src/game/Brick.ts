class Brick extends RebounceObj{
	
	public constructor() {
		super();
	}

    static createByConfig(config:{color,x,y,width,height}):Brick{
        let brick = new Brick();
        brick.x =config.x;
        brick.y = config.y;
        brick.name = "brick";
        brick.graphics.beginFill(config.color, 1);
        brick.graphics.drawRect(0, 0, config.width, config.height);
        brick.graphics.endFill();
        return brick;
    }

}