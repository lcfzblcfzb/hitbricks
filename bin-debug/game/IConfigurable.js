function newInstance(con, config) {
    return new con(config);
}
var configuableMap = { 100: Brick };
function getConfigurableByType(type) {
    return configuableMap[type];
}
var BRICK = "brick";
var WALL = "wall";
var BAT = "bat";
var BALL = "ball";
//# sourceMappingURL=IConfigurable.js.map