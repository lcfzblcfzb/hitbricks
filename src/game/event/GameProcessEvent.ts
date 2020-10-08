/**
 * 游戏进程事件
 */
class GameProcessEvent extends egret.Event {

	public constructor(type: "GAME_START" | "STAGE_START" | "STAGE_END" | "GAME_END", bubble: boolean = false, cancelable: boolean = false) {
		super(type, bubble, cancelable);
	}

	static GAME_START: string = "GAME_START";
	static STAGE_START: string = "STAGE_START";
	static STAGE_END: string = "STAGE_END";
	static GAME_END: string = "GAME_END";

}