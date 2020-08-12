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

        let self = this;
        this.runGame().catch(e => {
            console.log(e);
        }).then(() => { return egret.startTick(self.update, self); })

    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
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
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    private update(timeStamp: number): boolean {

        GameManager.getInstance().update(timeStamp);
        // let ball = this.getChildByName("ball");
        // if (ball != null) {
        //     ball.x += this.speedX;
        //     ball.y += this.speedY;

        //     if (ball.y <= 0 || ball.y > this.height) {
        //         this.speedY = -this.speedY;
        //     }
        //     if (ball.x <= 0 || ball.x > this.width) {
        //         this.speedX = -this.speedX;
        //     }

        //     let ballRec = ball.getTransformedBounds(this);
        //     let bat = this.getChildByName("bat");
        //     let batRec = bat.getTransformedBounds(this);

        //     if (batRec.intersects(ballRec)) {
        //         this.speedY = -this.speedY;
        //     }

        //     let brick = this.getChildByName("brick");
        //     let brickRec = brick.getTransformedBounds(this);

        //     if (brickRec.intersects(ballRec)) {
        //         let inflateRec = brickRec.clone();
        //         inflateRec.inflate(ball.width / 2, ball.height / 2);//计算出碰撞外壳矩形;
        //         //计算反弹
        //         let intersectPoints = this.calcPoints(inflateRec, this.speedY / this.speedX, ball.y - ball.x * this.speedY / this.speedX);
        //         if (intersectPoints.length > 0) {
        //             let firstP = this.calcFirstIntersecPoint(intersectPoints);
        //             if (firstP != null) {
        //                 if (firstP.x == inflateRec.left || firstP.x == inflateRec.right) {
        //                     this.speedX = -this.speedX;
        //                 } else if (firstP.y == inflateRec.top || firstP.y == inflateRec.bottom) {
        //                     this.speedY = -this.speedY;
        //                 }
        //             }
        //         }

        //         this.removeChild(brick);
        //     }
        // }
        return false;

    }
  
    UIlayer = this;

    private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {

        GameManager.getInstance().init(this);

    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
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
