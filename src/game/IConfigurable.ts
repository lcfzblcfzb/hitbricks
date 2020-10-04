interface IConfigurable extends egret.Sprite {    
    getName():string;  
}

interface IConfigurableConstructor{
    new ( config:any):IConfigurable;
}


function newInstance(con:IConfigurableConstructor,config:any):IConfigurable{
    return new con(config);
}

let configuableMap: { [key: string]: IConfigurableConstructor }={100:Brick};

function getConfigurableByType(type:number):IConfigurableConstructor{
    return configuableMap[type];
}

const BRICK ="brick";
const WALL ="wall";
const BAT = "bat";
const BALL ="ball";