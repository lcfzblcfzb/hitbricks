
enum SpellEnum{

    MoreBall=100,
    SplitBall=101,
    MultiBat = 200

}

class SpellMng {

    static instance: SpellMng ;

    public static getInstance(): SpellMng {
        if(this.instance==null){
            this.instance = new SpellMng();
        }
        return SpellMng.instance;
    }

    private constructor() {

    }

    //创建新法术
    newInstance(type: number, config: any): ISpell {
        return new this.skillID2TypeMap[type](config);
    }

    skillID2TypeMap: { [key: number]: ISpellConstructor } = { [SpellEnum.MoreBall]: AddMoreBall, [SpellEnum.SplitBall]: SplitBall, [SpellEnum.MultiBat]: MultiBat };

}

