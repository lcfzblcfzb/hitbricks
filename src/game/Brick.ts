class Brick extends RebounceObj {

    public constructor(config: any) {
        super();
        this.x = config.x;
        this.y = config.y;
        this.name = "brick";
        this.graphics.beginFill(config.color, 1);
        this.graphics.drawRect(0, 0, config.width, config.height);
        this.graphics.endFill();
        this.deleteOnHit == true;
    }

    getName(): string {
        return BRICK;
    }

}

