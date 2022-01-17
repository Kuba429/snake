import { ctx, food, game, p1 } from "./main";
export default class Game {
    canvasWidth: number;
    gridSize: number;
    cellSize: number;
    initialFps: number;
    fps: number;
    loopNow: number;
    loopThen: number;
    score: number;
    constructor(canvasWidth: number) {
        this.canvasWidth = canvasWidth;
        this.gridSize = 30;
        this.cellSize = canvasWidth / this.gridSize;
        this.initialFps = 7;
        this.fps = this.initialFps;
        this.score = 0;
        this.loopNow = this.getTime();
        this.loopThen = this.getTime();
    }

    getNextFrame() {
        // this method is passed as a callback which unables it to read 'this'
        // must use object name ('game') instead
        game.loopNow = game.getTime();
        if (game.loopNow - game.loopThen > 1000 / game.fps) {
            game.loopThen = game.getTime();
            game.executeFrame();
        }
        requestAnimationFrame(game.getNextFrame);
    }
    executeFrame() {
        this.clearCanvas();
        p1.move();
    }
    over() {
        alert(`Game over. Score: ${this.score}`);
        this.score = 0;
        this.fps = this.initialFps;
        p1.setDefaults();
    }
    updateScore() {
        const scoreElement: Element = document.querySelector(".score")!;
        scoreElement.textContent = this.score.toString();
        if (this.score % 3 == 0) {
            this.fps += 0.4;
        }
        console.log(this.fps);
    }
    drawGrid() {
        ctx!.strokeStyle = "#61234E";
        for (let i = 1; i < this.gridSize; i++) {
            ctx?.moveTo(this.cellSize * i, 0);
            ctx?.lineTo(this.cellSize * i, this.canvasWidth);

            ctx?.moveTo(0, this.cellSize * i);
            ctx?.lineTo(this.canvasWidth, this.cellSize * i);
        }
        ctx?.stroke();
    }
    clearCanvas() {
        ctx?.clearRect(0, 0, this.canvasWidth, this.canvasWidth);
        this.drawGrid();
        food.draw();
    }
    getTime() {
        return new Date().getTime();
    }
}
