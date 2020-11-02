class LoginUI extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.onStart, this, false);
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);

	}


	protected childrenCreated(): void {
		super.childrenCreated();

		this.anchorOffsetX = this.width / 2;
		this.x = this.stage.stageWidth / 2;
		this.y = this.stage.stageHeight * 0.2;

		let stageLbl = this['stageNum'] as eui.Label;
		stageLbl.text = PlayerMng.getInstance().chap + "_" + PlayerMng.getInstance().index;

		const mcFactory: egret.MovieClipDataFactory = this.stage['mcFactory'];
		var mc1: egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData("start_btn_pressed"));
		// mc1.anchorOffsetX = mc1.width/2;

		this['startGroup'].addChild(mc1);
		this.scaleX = 128 / mc1.width;
		this.scaleY = 128 / mc1.height;

		mc1.gotoAndPlay(0, -1);
	}

	private onStart(e: egret.TouchEvent): void {
		if (e.target.name == "startGroup") {
			this.dispatchEvent(new GameProcessEvent("GAME_START"));
			GameManager.getInstance().initStage(StageMng.getInstance().getCurrentStage());
		}
	}

	public updateStageIndex(): void {
		let stageLbl = this['stageNum'] as eui.Label;
		stageLbl.text = PlayerMng.getInstance().chap + "-" + PlayerMng.getInstance().index;
	}

}

