class PlayerMng {
	public constructor() {
	}

	static playerMng = new PlayerMng();

	public static getInstance():PlayerMng{
		return PlayerMng.playerMng;
	}


	//当前关卡信息
	chap:number=-1;
	index:number=-1;

}