import { ctx, game, p1 } from "./main";
export default class GameData {
    canvasWidth: number;
    gridSize: number;
    cellSize: number;
    fps: number;
    loopNow: number;
    loopThen: number;
    constructor(canvasWidth: number) {
        this.canvasWidth = canvasWidth;
        this.gridSize = 30;
        this.cellSize = canvasWidth / this.gridSize;
        this.fps = 1.27;
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
        p1.move();
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
    getTime() {
        return new Date().getTime();
    }
}
