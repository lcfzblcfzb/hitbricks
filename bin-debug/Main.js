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
        return _this;
    }
    Main.prototype.createChildren = function () {
        var _this = this;
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
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
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
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var result, setting, init;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.createGameScene()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.getResAsync("description_json")];
                    case 3:
                        result = _a.sent();
                        return [4 /*yield*/, platform.login()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, RES.getResAsync("myGame_json")];
                    case 5:
                        setting = _a.sent();
                        if (PlayerMng.getInstance().chap <= 0) {
                            //初始化为第一关；
                            GameManager.getInstance().init(this.gameGroup, setting);
                            PlayerMng.getInstance().chap = setting.initChap;
                            PlayerMng.getInstance().index = setting.initIndex;
                        }
                        return [4 /*yield*/, StageMng.getInstance().init()];
                    case 6:
                        init = _a.sent();
                        this.loginUI.updateStageIndex();
                        //游戏结束
                        this.addEventListener(GameProcessEvent.GAME_END, function () {
                            _this.loginUI.visible = true;
                            _this.gameGroup.mask = _this.gameGroupMask;
                            PlayerMng.getInstance().chap = setting.initChap;
                            PlayerMng.getInstance().index = setting.initIndex;
                            _this.loginUI.updateStageIndex();
                        }, this);
                        //游戏开始
                        this.addEventListener(GameProcessEvent.STAGE_START, function () {
                            _this.loginUI.visible = false;
                            _this.gameGroup.mask = null;
                        }, this);
                        //游戏暂停
                        this.addEventListener(GameProcessEvent.STAGE_PAUSED, function () {
                            _this.loginUI.visible = true;
                            _this.loginUI.updateStageIndex();
                            _this.gameGroup.mask = _this.gameGroupMask;
                        }, this);
                        //游戏暂停返回
                        this.addEventListener(GameProcessEvent.STAGE_RETURN, function () {
                            _this.loginUI.visible = false;
                            _this.gameGroup.mask = null;
                        }, this);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, pic, json, mcFactory, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        // await RES.loadConfig("default.res.json", "http://139.155.27.151:8080/res/resource/").catch((err) => {
                        // });
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        // await RES.loadConfig("default.res.json", "http://139.155.27.151:8080/res/resource/").catch((err) => {
                        // });
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 3:
                        _a.sent();
                        pic = RES.getRes("MovieClips_png");
                        json = RES.getRes("MovieClips_json");
                        mcFactory = new egret.MovieClipDataFactory(json, pic);
                        this.stage['mcFactory'] = mcFactory;
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
            // let theme = new eui.Theme("resource/default.thm.json", this.stage);
            // theme.addEventListener(eui.UIEvent.COMPLETE, () => {
            //     resolve();
            // }, this);
            egret.ImageLoader.crossOrigin = "anonymous"; //设置允许跨域加载
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage); //这里要填入服务器的ip地址
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    Main.prototype.update = function (timeStamp) {
        // console.log("tick:" + timeStamp);
        GameManager.getInstance().update(timeStamp);
        return false;
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.createGameScene = function () {
        return __awaiter(this, void 0, void 0, function () {
            var bg, stageW, stageH;
            return __generator(this, function (_a) {
                bg = Utils.createBitmapByName("BG_COMMON");
                bg.fillMode = egret.BitmapFillMode.SCALE;
                this.addChild(bg);
                stageW = this.stage.stageWidth;
                stageH = this.stage.stageHeight;
                bg.width = stageW;
                bg.height = stageH;
                this.gameGroupMask = new eui.Group();
                this.gameGroupMask.width = this.width;
                this.gameGroupMask.height = this.height;
                this.gameGroupMask.touchThrough = true;
                this.addChild(this.gameGroupMask);
                this.gameGroup = new eui.Group();
                this.gameGroup.width = this.width;
                this.gameGroup.height = this.height;
                this.addChild(this.gameGroup);
                this.loginUI = new LoginUI();
                this.addChild(this.loginUI);
                return [2 /*return*/];
            });
        });
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
//# sourceMappingURL=Main.js.map