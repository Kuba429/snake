import { ctx, game } from "./main";
export default class Player {
    color: string;
    direction: string;
    size: number;
    x: number;
    y: number;
    constructor() {
        this.color = "#FF5858";
        this.direction = "down";
        this.size = game.cellSize;
        const middle = Math.floor(game.gridSize / 2) * this.size;
        this.x = middle;
        this.y = middle;
    }
    move() {
        switch (this.direction) {
            case "up":
                this.y -= this.size;
                break;
            case "down":
                this.y += this.size;
                break;
            case "right":
                this.x += game.cellSize;
                break;
            case "left":
                this.x -= this.size;
                break;
            default:
                return;
        }
        const limit = (game.gridSize - 1) * game.cellSize;
        if (this.x > limit) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = limit;
        }
        if (this.y > limit) {
            this.y = 0;
        } else if (this.y < 0) {
            this.y = limit;
        }
        this.draw();
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
    addListeners() {
        addEventListener("keydown", (e) => {
            switch (e.code) {
                case "ArrowLeft":
                    this.direction = "left";
                    break;
                case "ArrowRight":
                    this.direction = "right";
                    break;
                case "ArrowUp":
                    this.direction = "up";
                    break;
                case "ArrowDown":
                    this.direction = "down";
                    break;

                default:
                    break;
            }
        });
    }
}
