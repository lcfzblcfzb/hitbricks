interface IMovable {
    x: number;
    y: number;
    width: number;
    height: number;
    speedX: number;
    speedY: number;
    canMove: boolean;
    update(context: any): void;
    revertXSpeed(): void;
    revertYSpeed(): void;
}   