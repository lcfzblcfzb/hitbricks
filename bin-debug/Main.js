<<<<<<< HEAD
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
=======
>>>>>>> temp
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
<<<<<<< HEAD
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.createChildren = function () {
=======
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
// declare const Bmob: any;
//游戏实际的宽高比
var GAME_RATIO = 0.6;
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.UIlayer = _this;
        _this.pause = false;
        return _this;
    }
    //获取单例；
    Main.getInstance = function () {
        return Main.instance;
    };
    Main.prototype.createChildren = function () {
        var _this = this;
>>>>>>> temp
        _super.prototype.createChildren.call(this);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
<<<<<<< HEAD
=======
        if (Main.instance == null) {
            Main.instance = this;
        }
>>>>>>> temp
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
<<<<<<< HEAD
        this.runGame().catch(function (e) {
            console.log(e);
=======
        this.addEventListener(egret.Event.RESIZE, function (e) {
            console.log("in resize");
            console.log("windowwidth:" + window.innerWidth);
            console.log("windowheight:" + window.innerHeight);
            console.log("stagewidth:" + _this.stage.width);
            console.log("stageheight:" + _this.stage.height);
        }, this);
        var self = this;
        this.runGame().catch(function (e) {
            console.log(e);
        }).then(function () {
            return egret.startTick(self.update, self);
>>>>>>> temp
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
<<<<<<< HEAD
            var result, userInfo;
=======
            var _this = this;
            var result, loginWechatBtn, userInfo, setting, init;
>>>>>>> temp
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
<<<<<<< HEAD
                        this.createGameScene();
                        return [4 /*yield*/, RES.getResAsync("description_json")];
                    case 2:
                        result = _a.sent();
                        this.startAnimation(result);
                        return [4 /*yield*/, platform.login()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 4:
                        userInfo = _a.sent();
                        console.log(userInfo);
=======
                        return [4 /*yield*/, RES.getResAsync("description_json")];
                    case 2:
                        result = _a.sent();
                        this._createBG();
                        loginWechatBtn = new eui.Label();
                        loginWechatBtn.x = 0.5 * this.stage.stageWidth;
                        loginWechatBtn.y = 0.2 * this.stage.stageHeight;
                        loginWechatBtn.width = 128;
                        loginWechatBtn.height = 128;
                        loginWechatBtn.text = "用户授权";
                        loginWechatBtn.verticalAlign = egret.VerticalAlign.MIDDLE;
                        loginWechatBtn.textColor = 0x29179c;
                        loginWechatBtn.stroke = 2;
                        loginWechatBtn.strokeColor = 0x5748bd;
                        loginWechatBtn.background = true;
                        loginWechatBtn.backgroundColor = 0xafbd4a;
                        loginWechatBtn.alpha = 0.8;
                        this.addChild(loginWechatBtn);
                        return [4 /*yield*/, platform.login()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, platform.getUserInfo((loginWechatBtn.x - 64) / this.stage.stageWidth, 0.2, 128 / this.stage.stageWidth, 128 / this.stage.stageHeight)];
                    case 4:
                        userInfo = _a.sent();
                        console.log(userInfo);
                        this.removeChild(loginWechatBtn);
                        return [4 /*yield*/, this.createGameScene()];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, RES.getResAsync("myGame_json")];
                    case 6:
                        setting = _a.sent();
                        if (PlayerMng.getInstance().chap <= 0) {
                            //初始化为第一关；
                            GameManager.getInstance().init(this.gameGroup, setting);
                            PlayerMng.getInstance().chap = setting.initChap;
                            PlayerMng.getInstance().index = setting.initIndex;
                        }
                        return [4 /*yield*/, StageMng.getInstance().init()];
                    case 7:
                        init = _a.sent();
                        this.loginUI.updateStageIndex();
                        //游戏结束
                        this.addEventListener(GameProcessEvent.GAME_END, function (e) {
                            PlayerMng.getInstance().chap = setting.initChap;
                            PlayerMng.getInstance().index = setting.initIndex;
                            _this.loginUI.updateStageIndex();
                            //设置暂停按钮为不可见
                            _this.pauseBtn.visible = false;
                            if (e.data) {
                                //玩家胜利 播放胜利图片
                                var label = new egret.TextField();
                                label.text = "YOU WIN,NOW HAPPY?";
                                label.textColor = 0xff002f;
                                label.size = 60;
                                label.verticalAlign = egret.VerticalAlign.MIDDLE;
                                label.alpha = 0;
                                _this.addChild(label);
                                label.height = 500;
                                label.width = 300;
                                label.anchorOffsetX = label.width / 2;
                                label.anchorOffsetY = label.height / 2;
                                label.wordWrap = true;
                                label.multiline = true;
                                label.type = egret.TextFieldType.INPUT;
                                label.x = _this.stage.stageWidth / 2;
                                label.y = _this.stage.stageHeight / 3;
                                var tween = egret.Tween.get(label).to({ alpha: 1 }, 1000, egret.Ease.circIn).wait(700).call(function () {
                                    //玩家失败 播放失败图片
                                    var img = new egret.Bitmap();
                                    img.texture = RES.getRes("SAD_SCENE");
                                    img.anchorOffsetX = img.width / 2;
                                    img.anchorOffsetY = img.height / 2;
                                    img.x = _this.stage.stageWidth / 2;
                                    img.y = _this.stage.stageHeight / 2;
                                    img.fillMode = egret.BitmapFillMode.SCALE;
                                    _this.addChild(img);
                                    var listener = function (e) {
                                        _this.removeChild(label);
                                        _this.removeChild(img);
                                        _this.loginUI.visible = true;
                                        _this.gameGroupMask.visible = true;
                                        _this.removeEventListener("touchTap", listener, _this);
                                    };
                                    _this.addEventListener('touchTap', listener, _this);
                                });
                                //游戏内容变成透明
                                egret.Tween.get(_this.gameGroup).to({ alpha: 0 }, 1000);
                            }
                            else {
                                //玩家失败 播放失败动画
                                var label = new egret.TextField();
                                label.text = "YOU DIE";
                                label.textColor = 0xff002f;
                                label.size = 60;
                                label.verticalAlign = egret.VerticalAlign.MIDDLE;
                                label.alpha = 0;
                                label.anchorOffsetX = label.width / 2;
                                label.anchorOffsetY = label.height / 2;
                                _this.addChild(label);
                                label.x = _this.stage.stageWidth / 2;
                                label.y = _this.stage.stageHeight / 3;
                                var tween = egret.Tween.get(label).to({ alpha: 1 }, 1500, egret.Ease.circIn).wait(700).call(function () {
                                    //玩家失败 播放失败图片
                                    var img = new egret.Bitmap();
                                    img.texture = RES.getRes("FAIL_SCENE");
                                    img.anchorOffsetX = img.width / 2;
                                    img.anchorOffsetY = img.height / 2;
                                    img.x = _this.stage.stageWidth / 2;
                                    img.y = _this.stage.stageHeight / 2;
                                    img.fillMode = egret.BitmapFillMode.SCALE;
                                    _this.addChild(img);
                                    var listener = function (e) {
                                        //重新设置为可见
                                        _this.removeChild(label);
                                        _this.removeChild(img);
                                        //显示UI 操作
                                        _this.loginUI.visible = true;
                                        _this.gameGroupMask.visible = true;
                                        _this.removeEventListener("touchTap", listener, _this);
                                    };
                                    _this.addEventListener('touchTap', listener, _this);
                                });
                                egret.Tween.get(_this.gameGroup).to({ alpha: 0 }, 1000);
                            }
                        }, this);
                        //游戏结束
                        this.addEventListener(GameProcessEvent.STAGE_END, function (e) {
                            if (e.data && !StageMng.getInstance().isLastStage()) {
                                //暂停按钮隐藏
                                _this.pauseBtn.visible = false;
                                //玩家小关胜利 播放胜利图片
                                var img = new egret.Bitmap();
                                img.texture = RES.getRes("WIN_SCENE");
                                img.fillMode = egret.BitmapFillMode.SCALE;
                                img.anchorOffsetX = img.width / 2;
                                img.anchorOffsetY = img.height / 2;
                                img.x = _this.stage.stageWidth / 2;
                                img.y = _this.stage.stageHeight / 2;
                                _this.addChild(img);
                                var listener_1 = function (e) {
                                    _this.removeChild(img);
                                    _this.removeEventListener("touchEnd", listener_1, _this);
                                    //下一关
                                    var nextStage = StageMng.getInstance().getNextStage();
                                    GameManager.getInstance().initStage(nextStage);
                                    PlayerMng.getInstance().chap = parseInt(nextStage.chap);
                                    PlayerMng.getInstance().index = parseInt(nextStage.index);
                                };
                                _this.addEventListener('touchEnd', listener_1, _this);
                                egret.Tween.get(_this.gameGroup).to({ alpha: 0 }, 1000);
                            }
                        }, this);
                        //游戏开始
                        this.addEventListener(GameProcessEvent.STAGE_START, function () {
                            _this.loginUI.visible = false;
                            _this.gameGroupMask.visible = false;
                            _this.pauseBtn.visible = true;
                            egret.Tween.get(_this.gameGroup).to({ alpha: 1 }, 1000);
                        }, this);
                        //游戏暂停
                        this.addEventListener(GameProcessEvent.STAGE_PAUSED, function () {
                            // this.gameGroupMask.visible = true;
                        }, this);
                        //游戏暂停返回
                        this.addEventListener(GameProcessEvent.STAGE_RETURN, function () {
                            _this.loginUI.visible = false;
                            _this.gameGroupMask.visible = false;
                        }, this);
                        this.dispatchEvent(GameProcessEvent.newInstance('GAME_START'));
>>>>>>> temp
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
<<<<<<< HEAD
            var loadingView, e_1;
=======
            var loadingView, pic, json, mcFactory, e_1;
>>>>>>> temp
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
<<<<<<< HEAD
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 3:
                        _a.sent();
=======
                        return [4 /*yield*/, RES.loadConfig("default.res.json", "https://www.lcfme.fun:8080/res/resource/").catch(function (err) {
                                console.log("err loading res");
                                console.log(err);
                            })];
                    case 1:
                        _a.sent();
                        // await RES.loadConfig("resource/default.res.json", "resource/");
                        //
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 2:
                        // await RES.loadConfig("resource/default.res.json", "resource/");
                        //
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 3:
                        _a.sent();
                        pic = RES.getRes("MovieClips_png");
                        json = RES.getRes("MovieClips_json");
                        mcFactory = new egret.MovieClipDataFactory(json, pic);
                        this.stage['mcFactory'] = mcFactory;
>>>>>>> temp
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
<<<<<<< HEAD
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
=======
            // let theme = new eui.Theme("resource/default.thm.json", this.stage);
            // theme.addEventListener(eui.UIEvent.COMPLETE, () => {
            //     resolve();
            // }, this);
            egret.ImageLoader.crossOrigin = "anonymous"; //设置允许跨域加载
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage); //这里要填入服务器的ip地址
>>>>>>> temp
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
<<<<<<< HEAD
=======
    Main.prototype.update = function (timeStamp) {
        if (!this.pause) {
            // console.log("tick:" + timeStamp);
            GameManager.getInstance().update(timeStamp);
        }
        return false;
    };
    //创建背景图
    Main.prototype._createBG = function () {
        var bg = Utils.createBitmapByName("BG_COMMON");
        bg.fillMode = egret.BitmapFillMode.SCALE;
        this.addChild(bg);
        bg.width = this.stage.stageWidth;
        bg.height = this.stage.stageHeight;
    };
>>>>>>> temp
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.createGameScene = function () {
<<<<<<< HEAD
        var sky = this.createBitmapByName("bg_jpg");
        this.addChild(sky);
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;
        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        this.addChild(topMask);
        var icon = this.createBitmapByName("egret_icon_png");
        this.addChild(icon);
        icon.x = 26;
        icon.y = 33;
        var line = new egret.Shape();
        line.graphics.lineStyle(2, 0xffffff);
        line.graphics.moveTo(0, 0);
        line.graphics.lineTo(0, 117);
        line.graphics.endFill();
        line.x = 172;
        line.y = 61;
        this.addChild(line);
        var colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = stageW - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = "Hello Egret";
        colorLabel.size = 24;
        colorLabel.x = 172;
        colorLabel.y = 80;
        this.addChild(colorLabel);
        var textfield = new egret.TextField();
        this.addChild(textfield);
        textfield.alpha = 0;
        textfield.width = stageW - 172;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 24;
        textfield.textColor = 0xffffff;
        textfield.x = 172;
        textfield.y = 135;
        this.textfield = textfield;
        var button = new eui.Button();
        button.label = "Click!";
        button.horizontalCenter = 0;
        button.verticalCenter = 0;
        this.addChild(button);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    Main.prototype.startAnimation = function (result) {
        var _this = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = result.map(function (text) { return parser.parse(text); });
        var textfield = this.textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var textFlow = textflowArr[count];
            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, _this);
        };
        change();
=======
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var stageW, stageH, shp, _resunmeFunc;
            return __generator(this, function (_a) {
                stageW = this.stage.stageWidth;
                stageH = this.stage.stageHeight;
                this.gameGroup = new eui.Group();
                this.gameGroup.width = this.width;
                this.gameGroup.height = this.height;
                this.addChild(this.gameGroup);
                this.gameGroupMask = new eui.Group();
                this.gameGroupMask.alpha = 0;
                shp = new egret.Shape();
                shp.width = this.stage.stageWidth;
                shp.height = this.stage.stageHeight;
                shp.graphics.beginFill(0xff0000, 0.2);
                shp.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
                shp.graphics.endFill();
                this.gameGroupMask.touchChildren = false;
                this.gameGroupMask.touchThrough = false;
                this.gameGroupMask.addChild(shp);
                this.addChild(this.gameGroupMask);
                this.loginUI = new LoginUI();
                this.addChild(this.loginUI);
                //暂停按钮
                this.pauseBtn = new egret.Bitmap();
                this.pauseBtn.visible = false;
                this.pauseBtn.texture = RES.getRes("PAUSE_BTN");
                this.pauseBtn.width = 32;
                this.pauseBtn.height = 32;
                this.addChild(this.pauseBtn);
                this.pauseBtn.x = stageW - this.pauseBtn.width - 5;
                this.pauseBtn.y = 5;
                this.pauseBtn.touchEnabled = true;
                _resunmeFunc = function () {
                    egret.Tween.get(_this.gameGroupMask).to({ alpha: 0 }, 600).call(function () {
                        _this.gameGroupMask.visible = false;
                        _this.pause = false;
                    });
                    _this.pauseBtn.texture = RES.getRes("PAUSE_BTN");
                    if (_this.gameGroupMask.hasEventListener("touchEnd"))
                        _this.gameGroupMask.removeEventListener("touchEnd", _resunmeFunc, _this);
                };
                this.pauseBtn.addEventListener('touchEnd', function () {
                    if (_this.pause) {
                        _resunmeFunc();
                    }
                    else {
                        _this.pause = true;
                        _this.gameGroupMask.visible = true;
                        egret.Tween.get(_this.gameGroupMask).to({ alpha: 0 }, 0).to({ alpha: 1 }, 600);
                        _this.gameGroupMask.addEventListener("touchEnd", _resunmeFunc, _this);
                        _this.pauseBtn.texture = RES.getRes("RESUME_BTN");
                        _this.dispatchEvent(GameProcessEvent.newInstance('STAGE_PAUSED'));
                    }
                }, this);
                return [2 /*return*/];
            });
        });
>>>>>>> temp
    };
    /**
     * 点击按钮
     * Click the button
     */
    Main.prototype.onButtonClick = function (e) {
        var panel = new eui.Panel();
        panel.title = "Title";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        this.addChild(panel);
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
<<<<<<< HEAD
=======
//# sourceMappingURL=Main.js.map
>>>>>>> temp
