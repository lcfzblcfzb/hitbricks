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
        await this.createGameScene();
        const result = await RES.getResAsync("description_json")

        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);
        
        //TODO 保存用户数据，取得关卡信息；
        const setting = await RES.getResAsync("myGame_json");
        if (PlayerMng.getInstance().chap <= 0) {
            //初始化为第一关；

            GameManager.getInstance().init(this.gameGroup, setting);
            PlayerMng.getInstance().chap = setting.initChap;
            PlayerMng.getInstance().index = setting.initIndex;
        }
        const init = await StageMng.getInstance().init();
        this.loginUI.updateStageIndex();

        //游戏结束
        this.addEventListener(GameProcessEvent.GAME_END, () => {
            this.loginUI.visible = true;
            this.gameGroup.mask = this.gameGroupMask;

            PlayerMng.getInstance().chap = setting.initChap;
            PlayerMng.getInstance().index = setting.initIndex;
            this.loginUI.updateStageIndex();
        }, this);

        //游戏开始
        this.addEventListener(GameProcessEvent.STAGE_START, () => {
            this.loginUI.visible = false;
            this.gameGroup.mask = null;

        }, this);

        //游戏暂停
        this.addEventListener(GameProcessEvent.STAGE_PAUSED, () => {
            this.loginUI.visible = true;
            this.loginUI.updateStageIndex();
            this.gameGroup.mask = this.gameGroupMask;
        }, this);

        //游戏暂停返回
        this.addEventListener(GameProcessEvent.STAGE_RETURN, () => {
            this.loginUI.visible = false;
            this.gameGroup.mask = null;
        }, this);

        // const userInfo = await platform.getUserInfo();
        // console.log(userInfo);
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            // await RES.loadConfig("default.res.json", "http://139.155.27.151:8080/res/resource/").catch((err) => {
            // });

            await RES.loadConfig("resource/default.res.json", "resource/");
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
    }
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

        // console.log("tick:" + timeStamp);
        GameManager.getInstance().update(timeStamp);

        return false;

    }

    UIlayer = this;
    //遮罩对象
    gameGroupMask: eui.Group;
    //游戏group,每一局都会重置;
    gameGroup: eui.Group;
    //关卡选择UI;
    loginUI: LoginUI;
    //UI 布局group；
    hudGroup: eui.Group;
    //动画工厂
    mcFactory: egret.MovieClipDataFactory;

    private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected async createGameScene() {

        let bg = Utils.createBitmapByName("BG_COMMON");
        bg.fillMode = egret.BitmapFillMode.SCALE;
        this.addChild(bg);
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
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

