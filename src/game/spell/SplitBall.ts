class SplitBall implements ISpell {

    public constructor(config:any){
        
    }

    onCast(): void {

        let ballList: Array<Ball> = GameManager.getInstance().balls;
        if (ballList != null && ballList.length > 0) {

            for (let i in ballList) {

                let ball = ballList[i];
                let newBall = new Ball(ball.x, ball.y);

                let arc = Math.random() * 2 * Math.PI;
                let tanA = Math.atan(arc);

                let speedBall = Math.pow(ball.speedX, 2) + Math.pow(ball.speedY, 2);

                let speedX, speedY = 0;

                speedX = Math.sqrt(speedBall / (1 + Math.pow(tanA, 2)));

                if (arc > Math.PI / 2 && arc < Math.PI * 3 / 2) {
                    speedX = -speedX;
                }
                speedY = speedX * tanA;

                console.log("speedX" + speedX + ";speedY:" + speedY);

                newBall.x = ball.x;
                newBall.y = ball.y;
                newBall.speedX = speedX;
                newBall.speedY = speedY;

                ballList.push(newBall);
                GameManager.getInstance().stage.addChild(newBall);
            }

        }
    }


}