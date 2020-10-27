interface IMovable {
    x: number;
    y: number;
    width: number;
    height: number;
    speedX: number;
    speedY: number;
    canMove: boolean;
    update(context: any): void;
    resetXSpeed(direction:boolean): void;
    resetYSpeed(direction:boolean): void;

    collitionTag:number;
}   