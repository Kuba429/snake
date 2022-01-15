import { ctx, game } from "./main";
export default class Player {
    color: string;
    vel: number;
    direction: string;
    size: number;
    x: number;
    y: number;
    constructor() {
        this.color = "#FF5858";
        this.vel = 1;
        this.direction = "right";
        this.size = game.cellSize;
        const middle = Math.floor(game.gridSize / 2) * this.size;
        this.x = middle;
        this.y = middle;
    }
    move() {
        console.log("move");
    }
    draw() {
        ctx!.strokeStyle = this.color;
        ctx?.beginPath();
        const rectCords: [number, number, number, number] = [
            this.x,
            this.y,
            this.size,
            this.size,
        ];
        ctx?.fillRect(...rectCords);
        ctx?.rect(...rectCords);
        ctx?.stroke();
    }
}
