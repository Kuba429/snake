import { ctx } from "./main";
export default class GameData {
    canvasWidth: number;
    gridSize: number;
    cellSize: number;

    constructor(canvasWidth: number) {
        this.canvasWidth = canvasWidth;
        this.gridSize = 30;
        this.cellSize = canvasWidth / this.gridSize;
    }

    drawGrid() {
        ctx!.strokeStyle = "#61234E";
        for (let i = 1; i < this.gridSize; i++) {
            ctx?.moveTo(this.cellSize * i, 0);
            ctx?.lineTo(this.cellSize * i, this.canvasWidth);

            ctx?.moveTo(0,this.cellSize * i);
            ctx?.lineTo( this.canvasWidth,this.cellSize * i);

        }
    }
}
