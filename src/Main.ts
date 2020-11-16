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
const GAME_RATIO = 0.6;

class Main extends eui.UILayer {

    static instance: Main;
    //获取单例；
    static getInstance(): Main {
        return Main.instance;
    }

    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        if (Main.instance == null) {
            Main.instance = this;
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        this.addEventListener(egret.Event.RESIZE, (e) => {
            console.log("in resize");

            console.log("windowwidth:" + window.innerWidth);
            console.log("windowheight:" + window.innerHeight);
            console.log("stagewidth:" + this.stage.width);
            console.log("stageheight:" + this.stage.height);
        }, this);
        let self = this;
        this.runGame().catch(e => {
            console.log(e);
        }).then(() => {

            return egret.startTick(self.update, self);
        })

    }

    private async runGame() {
        await this.loadResource()
        const result = await RES.getResAsync("description_json")

        this._createBG();

        let loginWechatBtn: eui.Label = new eui.Label();
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

        let loginResult = await platform.login();
        const userInfo = await platform.getUserInfo((loginWechatBtn.x - 64) / this.stage.stageWidth, 0.2, 128 / this.stage.stageWidth, 128 / this.stage.stageHeight);
        console.log(userInfo);

        this.removeChild(loginWechatBtn);

        await this.createGameScene();
        //TODO 保存用户数据，取得关卡信息；
        const setting = await RES.getResAsync("myGame_json");
        if (PlayerMng.getInstance().chap <= 0) {
            //初始化为第一关；
            GameManager.getInstance().init(this.gameGroup, setting);
            PlayerMng.getInstance().resetProperty();
        }
        //TODO 暂时放在这里：初始化技能
        PlayerMng.getInstance().setUpForStage(SpellEnum.MoreBall, SpellEnum.MultiBat);

        const init = await StageMng.getInstance().init();
        this.loginUI.updateStageIndex();

        //游戏结束
        this.addEventListener(GameProcessEvent.GAME_END, (e: GameProcessEvent) => {

            PlayerMng.getInstance().chap = setting.initChap;
            PlayerMng.getInstance().index = setting.initIndex;
            this.loginUI.updateStageIndex();
            //设置暂停按钮为不可见
            this.pauseBtn.visible = false;

            if (e.data) {

                //玩家胜利 播放胜利图片

                var label: egret.TextField = new egret.TextField();
                label.text = "YOU WIN,NOW HAPPY?";
                label.textColor = 0xff002f;
                label.size = 60;
                label.verticalAlign = egret.VerticalAlign.MIDDLE;
                label.alpha = 0;
                this.addChild(label);

                label.height = 500;
                label.width = 300;

                label.anchorOffsetX = label.width / 2;
                label.anchorOffsetY = label.height / 2;
                label.wordWrap = true;
                label.multiline = true;
                label.type = egret.TextFieldType.INPUT;
                label.x = this.stage.stageWidth / 2;
                label.y = this.stage.stageHeight / 3;
                var tween = egret.Tween.get(label).to({ alpha: 1 }, 1000, egret.Ease.circIn).wait(700).call(() => {
                    //玩家失败 播放失败图片
                    var img: egret.Bitmap = new egret.Bitmap();
                    img.texture = RES.getRes("SAD_SCENE");
                    img.anchorOffsetX = img.width / 2;
                    img.anchorOffsetY = img.height / 2;
                    img.x = this.stage.stageWidth / 2;
                    img.y = this.stage.stageHeight / 2;
                    img.fillMode = egret.BitmapFillMode.SCALE;
                    this.addChild(img);

                    let listener = (e) => {
                        this.removeChild(label);
                        this.removeChild(img);

                        this.loginUI.visible = true;
                        this.gameGroupMask.visible = true;
                        this.removeEventListener("touchTap", listener, this);
                    };
                    this.addEventListener('touchTap', listener, this);
                });

                //游戏内容变成透明
                egret.Tween.get(this.gameGroup).to({ alpha: 0 }, 1000);

            } else {
                //玩家失败 播放失败动画
                var label: egret.TextField = new egret.TextField();
                label.text = "YOU DIE";
                label.textColor = 0xff002f;
                label.size = 60;
                label.verticalAlign = egret.VerticalAlign.MIDDLE;
                label.alpha = 0;
                label.anchorOffsetX = label.width / 2;
                label.anchorOffsetY = label.height / 2;
                this.addChild(label);
                label.x = this.stage.stageWidth / 2;
                label.y = this.stage.stageHeight / 3;
                var tween = egret.Tween.get(label).to({ alpha: 1 }, 1500, egret.Ease.circIn).wait(700).call(() => {
                    //玩家失败 播放失败图片
                    var img: egret.Bitmap = new egret.Bitmap();
                    img.texture = RES.getRes("FAIL_SCENE");
                    img.anchorOffsetX = img.width / 2;
                    img.anchorOffsetY = img.height / 2;
                    img.x = this.stage.stageWidth / 2;
                    img.y = this.stage.stageHeight / 2;
                    img.fillMode = egret.BitmapFillMode.SCALE;
                    this.addChild(img);

                    let listener = (e) => {
                        //重新设置为可见

                        this.removeChild(label);
                        this.removeChild(img);
                        //显示UI 操作
                        this.loginUI.visible = true;
                        this.gameGroupMask.visible = true;
                        this.removeEventListener("touchTap", listener, this);
                    };
                    this.addEventListener('touchTap', listener, this);
                });

                egret.Tween.get(this.gameGroup).to({ alpha: 0 }, 1000);

            }
        }, this);

        //游戏结束
        this.addEventListener(GameProcessEvent.STAGE_END, (e: GameProcessEvent) => {


            if (e.data && !StageMng.getInstance().isLastStage()) {
                //暂停按钮隐藏
                this.pauseBtn.visible = false;
                //玩家小关胜利 播放胜利图片
                var img: egret.Bitmap = new egret.Bitmap();
                img.texture = RES.getRes("WIN_SCENE");
                img.fillMode = egret.BitmapFillMode.SCALE;
                img.anchorOffsetX = img.width / 2;
                img.anchorOffsetY = img.height / 2;
                img.x = this.stage.stageWidth / 2;
                img.y = this.stage.stageHeight / 2;

                this.addChild(img);

                let listener = (e) => {
                    this.removeChild(img);
                    this.removeEventListener("touchEnd", listener, this);
                    //下一关
                    let nextStage: any = StageMng.getInstance().getNextStage();
                    GameManager.getInstance().initStage(nextStage);
                    PlayerMng.getInstance().chap = parseInt(nextStage.chap);
                    PlayerMng.getInstance().index = parseInt(nextStage.index);
                };

                egret.Tween.get(this.gameGroup).to({ alpha: 0 }, 1000).call(() => {
                    this.addEventListener('touchEnd', listener, this);
                });
            }

        }, this);

        //游戏开始
        this.addEventListener(GameProcessEvent.GAME_START, () => {
            this.loginUI.visible = false;
        }, this);

        //游戏开始
        this.addEventListener(GameProcessEvent.STAGE_START, () => {
            this.gameGroupMask.visible = false;
            this.pauseBtn.visible = true;

            egret.Tween.get(this.gameGroup).to({ alpha: 1 }, 1000);
        }, this);

        //游戏暂停
        this.addEventListener(GameProcessEvent.STAGE_PAUSED, () => {
            // this.gameGroupMask.visible = true;
        }, this);

        //游戏暂停返回
        this.addEventListener(GameProcessEvent.STAGE_RETURN, () => {
            this.loginUI.visible = false;
            this.gameGroupMask.visible = false;
        }, this);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            egret.ImageLoader.crossOrigin = "anonymous";

            if (RELEASE) {
                await RES.loadConfig("default.res.json", "https://www.lcfme.fun:8080/res/resource/").catch((err) => {
                    console.log("err loading res");
                    console.log(err);

                });
            }
            if(DEBUG){
                await RES.loadConfig("resource/default.res.json", "resource/");
            }
            // 
            //
            await RES.loadGroup("preload", 0, loadingView);
            await this.loadTheme();

            let pic = RES.getRes("MovieClips_png");
            let json = RES.getRes("MovieClips_json");
            const mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(json, pic);
            this.stage['mcFactory'] = mcFactory;
            this.stage.removeChild(loadingView);

        }
        catch (e) {
            console.error(e);
        }
    } d
    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            // let theme = new eui.Theme("resource/default.thm.json", this.stage);
            // theme.addEventListener(eui.UIEvent.COMPLETE, () => {
            //     resolve();
            // }, this);

            egret.ImageLoader.crossOrigin = "anonymous";//设置允许跨域加载

            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);//这里要填入服务器的ip地址
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    private update(timeStamp: number): boolean {
        if (!this.pause) {
            // console.log("tick:" + timeStamp);
            GameManager.getInstance().update(timeStamp);
        }
        return false;

    }

    UIlayer = this;
    //游戏group,每一局都会重置;
    gameGroup: eui.Group;

    //遮罩对象
    gameGroupMask: eui.Group;
    //关卡选择UI;
    loginUI: LoginUI;
    //UI 布局group；
    hudGroup: eui.Group;
    //动画工厂
    mcFactory: egret.MovieClipDataFactory;
    //暂停按钮
    pauseBtn: egret.Bitmap;

    pause: boolean = false;

    private textfield: egret.TextField;

    //创建背景图
    private _createBG() {
        let bg = Utils.createBitmapByName("BG_COMMON");
        bg.fillMode = egret.BitmapFillMode.SCALE;
        this.addChild(bg);
        bg.width = this.stage.stageWidth;
        bg.height = this.stage.stageHeight;
    }

    /**
     * 创建场景界面
     * Create scene interface
     */
    protected async createGameScene() {

        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;

        this.gameGroup = new eui.Group();
        this.gameGroup.width = this.width;
        this.gameGroup.height = this.height;
        this.addChild(this.gameGroup);

        this.gameGroupMask = new eui.Group();
        this.gameGroupMask.alpha = 0;
        let shp = new egret.Shape();
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

        //从暂停中返回的操作,可以被按钮或者点击界面触发
        let _resunmeFunc = () => {

            egret.Tween.get(this.gameGroupMask).to({ alpha: 0 }, 600).call(() => {
                this.gameGroupMask.visible = false;
                this.pause = false;
            });

            this.pauseBtn.texture = RES.getRes("PAUSE_BTN");
            if (this.gameGroupMask.hasEventListener("touchEnd"))
                this.gameGroupMask.removeEventListener("touchEnd", _resunmeFunc, this);
        }
        this.pauseBtn.addEventListener('touchEnd', () => {
            if (this.pause) {
                _resunmeFunc();
            } else {
                this.pause = true;

                this.gameGroupMask.visible = true;
                egret.Tween.get(this.gameGroupMask).to({ alpha: 0 }, 0).to({ alpha: 1 }, 600);

                this.gameGroupMask.addEventListener("touchEnd", _resunmeFunc, this);

                this.pauseBtn.texture = RES.getRes("RESUME_BTN");

                this.dispatchEvent(GameProcessEvent.newInstance('STAGE_PAUSED'));
            }
        }, this);

        // var imgLoader: egret.ImageLoader = new egret.ImageLoader();
        // imgLoader.once(egret.Event.COMPLETE, (evt: egret.Event) => {
        //     let loader: egret.ImageLoader = evt.currentTarget;
        //     let bmd: egret.BitmapData = loader.data;
        //     //创建纹理对象
        //     let texture = new egret.Texture();
        //     texture.bitmapData = bmd;
        //     let bmp: egret.Bitmap = new egret.Bitmap(texture);
        //     bmp.width=100;
        //     bmp.height=100;
        //     this.addChild(bmp);
        // }, this);
        // imgLoader.crossOrigin = 'anonymous';
        // imgLoader.load("http://43.226.144.135:8080/file/preview.jpg");
        // var request = new egret.HttpRequest();
        // request.responseType = egret.HttpResponseType.TEXT;
        // request.open("http://139.155.27.151:8080/res/preview.jpg", egret.HttpMethod.GET);
        // request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // request.responseType = "blob";
        // request.send();
        // request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
        //     var request = <egret.HttpRequest>event.currentTarget;
        //     console.log("post data : ", request.response);
        //     var image = new Image();
        //     image.src = window["URL"].createObjectURL(request.response);
        //     image.onload = (res) => {
        //         //创建纹理对象
        //         let texture = new egret.Texture();
        //         texture.bitmapData = new egret.BitmapData(image);
        //         let bmp: egret.Bitmap = new egret.Bitmap(texture);
        //         this.addChild(bmp);
        //     }
        // }, this);
        // request.addEventListener(egret.IOErrorEvent.IO_ERROR, (e) => {
        // }, this);
        // request.addEventListener(egret.ProgressEvent.PROGRESS, (e) => {
        // }, this);

    }

    /**
     * 点击按钮
     * Click the button
     */
    private onButtonClick(e: egret.TouchEvent) {
        let panel = new eui.Panel();
        panel.title = "Title";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        this.addChild(panel);
    }
}

