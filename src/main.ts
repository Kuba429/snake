import "./styles/index.scss";
import GameData from "./Game";
import Player from "./Player";
const gameCanvas = <HTMLCanvasElement>document.getElementById("game-canvas");
export const ctx = gameCanvas.getContext("2d");
export const game = new GameData(gameCanvas.width);
export const p1 = new Player();

const init = () => {
    game.drawGrid();
    p1.draw();

    requestAnimationFrame(game.getNextFrame);
};

init();
