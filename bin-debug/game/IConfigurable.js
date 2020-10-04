function newInstance(con, config) {
    return new con(config);
}
var configuableMap = { 100: Brick };
function getConfigurableByType(type) {
    return configuableMap[type];
}
//定义枚举
var Configurable;
(function (Configurable) {
    Configurable[Configurable["BRICK"] = 100] = "BRICK";
    Configurable[Configurable["WALL"] = 200] = "WALL";
    Configurable[Configurable["BAT"] = 300] = "BAT";
    Configurable[Configurable["BALL"] = 400] = "BALL";
})(Configurable || (Configurable = {}));
var BRICK = "brick";
var WALL = "wall";
var BAT = "bat";
var BALL = "ball";
//# sourceMappingURL=IConfigurable.js.map