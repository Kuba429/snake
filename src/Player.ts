interface block {
    x: number;
    y: number;
}
import { ctx, game } from "./main";
export default class Player {
    color: string;
    direction: string;
    size: number;
    x: number;
    y: number;
    tail: block[];
    constructor() {
        this.color = "#FF5858";
        this.direction = "right";
        this.size = game.cellSize;
        const middle = Math.floor(game.gridSize / 2) * this.size;
        this.x = middle;
        this.y = middle;
        this.tail = [
            { x: this.x, y: this.y },
            { x: this.x, y: this.y },
        ];
    }
    setDefaults() {
        const middle = Math.floor(game.gridSize / 2) * this.size;
        this.x = middle;
        this.y = middle;
        this.tail = [
            { x: this.x, y: this.y },
            { x: this.x, y: this.y },
        ];
    }
    move() {
        // tail
        this.tail[this.tail.length - 1].x = this.x;
        this.tail[this.tail.length - 1].y = this.y;
        for (let i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = { ...this.tail[i + 1] };
        }
        // head
        switch (this.direction) {
            case "up":
                this.y -= this.size;
                break;
            case "down":
                this.y += this.size;
                break;
            case "right":
                this.x += this.size;
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
        this.detectCollision();
    }
    detectCollision() {
        const headPosition: string = JSON.stringify({ x: this.x, y: this.y });
        this.tail.forEach((block: object) => {
            if (JSON.stringify(block) == headPosition) game.over();
        });
    }
    addToTail() {
        if (this.tail.length < 1) {
            this.tail.unshift({
                x: this.x,
                y: this.y,
            });
        } else {
            // let lastBlock = this.tail[this.tail.length - 1];
            let lastBlock = this.tail[this.tail.length - 1];
            this.tail.unshift({ ...lastBlock });
        }
    }
    draw() {
        //head
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
        // tail
        this.tail.forEach((block) => {
            const rectCords: [number, number, number, number] = [
                block.x,
                block.y,
                this.size,
                this.size,
            ];
            ctx?.fillRect(...rectCords);
            ctx?.rect(...rectCords);
            ctx?.stroke();
        });
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
                case "Space":
                    this.addToTail();
                    break;
                case "Enter":
                    console.table(this.tail);
                    break;
                default:
                    break;
            }
        });
    }
}
