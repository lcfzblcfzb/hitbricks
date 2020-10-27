function newInstance(con, config) {
    return new con(config);
}
function getConfigurableByType(type) {
    var name = type2nameMap[type];
    if (name) {
        return configuableMap[name];
    }
    else {
        console.log("no cofiguarable found.type:" + type);
        return null;
    }
}
var BRICK = "brick";
var WALL = "wall";
var BAT = "bat";
var BALL = "ball";
//将配置文件的type 映射到 name 上；
var type2nameMap = { 100: BRICK, 200: WALL };
// 将name 映射到 构造器上；
var configuableMap = (_a = {}, _a[BRICK] = Brick, _a[WALL] = Wall, _a);
var _a;
//# sourceMappingURL=IConfigurable.js.map