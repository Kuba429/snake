import { ctx, gameData } from "./main";
export default class Player {
    color: string;
    vel: number;
    size: number;
    x: number;
    y: number;
    constructor(size: number) {
        this.color = "#FF5858";
        this.vel = 1;
        this.size = size;
        this.x = Math.floor(gameData.gridSize / 2) * this.size;
        this.y = Math.floor(gameData.gridSize / 2) * this.size;
    }
    spawn() {
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
