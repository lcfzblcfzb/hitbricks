class MultiBat implements ISpell {

    constructor(parameters) {

    }
    onCast(): void {
        //通过相对坐标 设定一定的gap 实现；
        let bat = GameManager.getInstance().batHolder;

        let width = bat.width;
        //生成的板间距
        let gap = GameManager.getInstance().stage.stage.stageWidth / 6;

        let leftBat = new Bat();
        bat.addChild(leftBat);
        leftBat.x = -width - gap;
        leftBat.y = 0;

        let rightBat = new Bat();
        bat.addChild(rightBat);
        rightBat.x = width + gap;
        rightBat.y = 0;

        GameManager.getInstance().bats.push(leftBat);

        GameManager.getInstance().bats.push(rightBat);
    }



}