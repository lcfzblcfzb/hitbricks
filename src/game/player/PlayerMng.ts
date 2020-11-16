

class PlayerMng extends egret.EventDispatcher {
	public constructor() {
		super();

		this.addEventListener(GameProcessEvent.GAME_END, () => {
			this.resetProperty();
		}, this);


	}

	static playerMng = new PlayerMng();

	public static getInstance(): PlayerMng {
		return PlayerMng.playerMng;
	}

	setting: any;
	//当前关卡信息
	chap: number = -1;
	index: number = -1;
	//bat 移动速度
	batSpeed = 5;
	_skillAId = 1;
	_skillBId = 100;

	skillA: ISpell;
	skillB: ISpell;

	//每次打完之后 重置属性
	resetProperty(): void {
		this.setting = RES.getRes("myGame_json");
		this.chap = this.setting.initChap;
		this.index = this.setting.initIndex;
		this.batSpeed = this.setting.batSpeed?this.setting.batSpeed:this.batSpeed;
		this.skillA = null;
		this.skillB = null;
		this._skillAId = -1;
		this._skillBId = -1;
	}

	setUpForStage(skillAId: number, _skillBId: number): void {
		this._skillAId = skillAId;
		this._skillBId = _skillBId;
		this.skillA = SpellMng.getInstance().newInstance(this._skillAId, {});
		this.skillB = SpellMng.getInstance().newInstance(this._skillBId, {});
	}

	castSpell(skill: number): void {
		switch (skill) {
			case 1:
				this.skillA.onCast();
				break;
			case 2:
				this.skillB.onCast();
				break;

		}
	}

}