//是指可以被bat 收集的 掉落道具
class CollectableItem extends Collectable implements IMovable {

    static toDeleteList: Array<CollectableItem> = [];
    static removeFromGame(item: CollectableItem): void {
        GameManager.getInstance().stage.removeChild(item);
        if (GameManager.getInstance().getEntityArray(ITEM) != null) {
            let idx = GameManager.getInstance().getEntityArray(ITEM).indexOf(item);
            GameManager.getInstance().getEntityArray(ITEM).splice(idx, 1);
        }
    }


    //碰到bat 回调
    onHitted(timestamp: number): void {
        this.collitionTag = timestamp;
        if (!this.deleted) {
            //触发效果
            let spell = SpellMng.getInstance().newInstance(this.spellId, null);
            spell.onCast();
            CollectableItem.toDeleteList.push(this);
            this.deleted = true;
        }

    }

    getName(): string {
        return ITEM;
    }

    deleteOnHit = true;

    update(timestamp: number): void {
        if (!this.deleted) {
            this.x += this.speedX;
            this.y += this.speedY;

            //保证不会跑出画布;
            if (this.y <= 0 && this.speedY < 0 || this.y > this.stage.stageHeight && this.speedY > 0) {
                CollectableItem.toDeleteList.push(this);
            }
            if (this.x <= 0 && this.speedX < 0) {
                CollectableItem.toDeleteList.push(this);
            } else if (this.x > this.stage.stageWidth && this.speedX > 0) {
                CollectableItem.toDeleteList.push(this);
            }
        }

    }

    public constructor(config: any) {
        super();
        this.x = config.x;
        this.y = config.y;
        this.spellId = config.spellId;
        this.speedY = config.speedY;
        this.speedX = 0;
        this.addChild(PaintUtil.createDisplayObj(this.getName()));
    }

    speedX: number;
    speedY: number;
    canMove: boolean;
    spellId: number;
    deleted: boolean = false;

    resetXSpeed(direction: boolean): void {
        throw new Error("Method not implemented.");
    }
    resetYSpeed(direction: boolean): void {
        throw new Error("Method not implemented.");
    }
    collitionTag: number;


}