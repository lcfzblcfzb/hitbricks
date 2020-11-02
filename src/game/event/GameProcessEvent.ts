/**
 * 游戏进程事件
 */
class GameProcessEvent extends egret.Event {

	public constructor(type: "GAME_START" | "STAGE_START" | "STAGE_END" | "GAME_END" | "STAGE_PAUSED" | "STAGE_RETURN", cancelable: boolean = false) {
		super(type, true, cancelable);
	}


	public static newInstance(type: "GAME_START" | "STAGE_START" | "STAGE_END" | "GAME_END" | "STAGE_PAUSED" | "STAGE_RETURN", data?: any):GameProcessEvent {
		let event = new GameProcessEvent(type);
		event.data = data;
		return event;
	}

	data: any;//type=GAME_END|STAGE_END ,true:玩家胜利，false:玩家失败

	static GAME_START: string = "GAME_START";
	static STAGE_START: string = "STAGE_START";
	static STAGE_END: string = "STAGE_END";
	static GAME_END: string = "GAME_END";
	static STAGE_PAUSED: string = "STAGE_PAUSED";
	static STAGE_RETURN: string = "STAGE_RETURN";
}