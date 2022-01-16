interface block {
    x: number;
    y: number;
}
import { ctx, food, game } from "./main";
export default class Player {
    color: string;
    direction: string;
    size: number;
    x: number;
    y: number;
    ready: boolean;
    queue: string;
    tail: block[];
    constructor() {
        this.color = "#FF5858";
        this.direction = "ArrowRight";
        this.size = game.cellSize;
        const middle = Math.floor(game.gridSize / 2) * this.size;
        this.x = middle;
        this.y = middle;
        this.ready = true;
        this.queue = this.direction;
        this.tail = [
            { x: this.x, y: this.y },
            { x: this.x, y: this.y },
        ];

    }
    setDefaults() {
        game.updateScore()
        const middle = Math.floor(game.gridSize / 2) * this.size;
        this.x = middle;
        this.y = middle;
        this.ready = true;
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
            case "ArrowUp":
                this.y -= this.size;
                break;
            case "ArrowDown":
                this.y += this.size;
                break;
            case "ArrowRight":
                this.x += this.size;
                break;
            case "ArrowLeft":
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

        if (getOpposite(this.queue) != this.direction) {
            this.direction = this.queue;
        }
        this.ready = true;
        this.draw();
        this.detectCollision();
    }
    addListeners() {
        const arrows = document.querySelectorAll<HTMLElement>(".arrow");
        arrows.forEach((arrow) => {
            arrow.addEventListener("click", () => {
                const arrowDirection: string = arrow.dataset.direction!;
                if (
                    this.direction != getOpposite(arrowDirection!) &&
                    this.ready
                ) {
                    this.direction = arrowDirection;
                }
                this.queue = arrowDirection;
                this.ready = false;
            });
        });

        addEventListener("keydown", (e) => {
            const element: HTMLElement = document.querySelector(
                `.arrow.${e.code}`
            )!;
            element && element.click();
        });
    }
    detectCollision() {
        const headPosition: string = JSON.stringify({ x: this.x, y: this.y });
        const foodPosition: string = JSON.stringify({ x: food.x, y: food.y });
        if (headPosition == foodPosition) food.getEaten();
        this.tail.forEach((block: object) => {
            if (JSON.stringify(block) == headPosition) game.over();
            else if (JSON.stringify(block) == foodPosition)
                food.getNewPosition();
        });
    }
    addToTail() {
        if (this.tail.length < 1) {
            this.tail.unshift({
                x: this.x,
                y: this.y,
            });
        } else {
            let lastBlock = this.tail[this.tail.length - 1];
            this.tail.unshift({ ...lastBlock });
        }
    }
    draw() {
        ctx!.fillStyle = "#000000";
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
}

const getOpposite = (direction: string) => {
    let toReturn: string = undefined!;
    switch (direction) {
        case "ArrowUp":
            toReturn = "ArrowDown";
            break;
        case "ArrowDown":
            toReturn = "ArrowUp";
            break;
        case "ArrowLeft":
            toReturn = "ArrowRight";
            break;
        case "ArrowRight":
            toReturn = "ArrowLeft";
            break;
        default:
            break;
    }

    return toReturn;
};
