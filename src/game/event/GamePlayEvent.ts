class GamePlayEvent extends egret.Event {

    public constructor(type: "CASTSKILL" , cancelable: boolean = false) {
        super(type, true, cancelable);
    }


    public static newInstance(type: "CASTSKILL" , data?: any): GameProcessEvent {
        let event = new GamePlayEvent(type);
        event.data = data;
        return event;
    }

    data: any;

    static CAST_SKILL: string = "CASTSKILL";


}