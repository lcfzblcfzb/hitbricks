class LoginUI extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();

		this.addEventListener(egret.TouchEvent.TOUCH_END, this.onStart, this);
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
	}

	private onStart(e: egret.TouchEvent): void {
		if (e.target.id = "playBtn") {
			GameManager.getInstance().initStage(StageMng.getInstance().getCurrentStage());
			this.visible = false;
			// this.enabled = false;
		}
	}

}