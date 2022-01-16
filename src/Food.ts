import { ctx, game, p1 } from "./main";

export default class Food {
    x: number;
    y: number;
    size: number;
    constructor() {
        this.x = 20;
        this.y = 20;
        this.size = p1.size;
        this.getNewPosition()
    }

    getEaten() {
        game.score++;
        this.getNewPosition();
        p1.addToTail();
    }
    getNewPosition() {
        this.x = Math.floor(Math.random() * game.gridSize) * game.cellSize;
        this.y = Math.floor(Math.random() * game.gridSize) * game.cellSize;
    }
    draw() {
        ctx!.strokeStyle = "#4FBDBA";
        ctx?.beginPath();
        const rectCords: [number, number, number, number] = [
            this.x,
            this.y,
            p1.size,
            p1.size,
        ];
        ctx!.fillStyle = "#4FBDBA";
        ctx?.fillRect(...rectCords);
        ctx?.rect(...rectCords);
        ctx?.stroke();
    }
}
