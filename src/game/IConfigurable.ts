interface IConfigurable extends egret.Sprite {
    getName(): string;
}

interface IConfigurableConstructor {
    new(config: any): IConfigurable;
}


function newInstance(con: IConfigurableConstructor, config: any): IConfigurable {
    return new con(config);
}

function getConfigurableByType(type: number): IConfigurableConstructor {

    let name = type2nameMap[type];
    if (name) {
        return configuableMap[name];
    } else {
        console.log("no cofiguarable found.type:" + type);
        return null;
    }

}

const BRICK = "brick";
const WALL = "wall";
const BAT = "bat";
const BALL = "ball";
const ITEM = "item";
//将配置文件的type 映射到 name 上；
let type2nameMap: { [key: number]: string } = { 100: BRICK, 200: WALL, 300: ITEM };
// 将name 映射到 构造器上；
let configuableMap: { [key: string]: IConfigurableConstructor } = { [BRICK]: Brick, [WALL]: Wall, [ITEM]: CollectableItem };

