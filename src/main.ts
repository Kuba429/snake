import "./styles/index.scss";
import GameData from "./Game";
import Player from "./Player";
const gameCanvas = <HTMLCanvasElement>document.getElementById("game-canvas");
export const ctx = gameCanvas.getContext("2d");
export const gameData = new GameData(gameCanvas.width);
export const p1 = new Player(gameData.cellSize);

const init = () => {
    gameData.drawGrid();
    p1.spawn()
};

init();
