import "./styles/index.scss";
import Game from "./Game";
import Player from "./Player";
const gameCanvas = <HTMLCanvasElement>document.getElementById("game-canvas");
export const ctx = gameCanvas.getContext("2d");
export const game = new Game(gameCanvas.width);
export const p1 = new Player();

const init = () => {
    game.drawGrid();
    p1.draw();
    p1.addListeners();
    requestAnimationFrame(game.getNextFrame);
};

init();
