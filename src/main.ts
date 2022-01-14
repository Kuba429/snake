import "./styles/index.scss";
import GameData from "./Game";
import Player from "./Player";
const gameCanvas = <HTMLCanvasElement>document.getElementById("game-canvas");
export const ctx = gameCanvas.getContext("2d");

const init = () => {
    const gameData = new GameData(gameCanvas.width);
    const p1 = new Player(gameData.cellSize);


    gameData.drawGrid()
    ctx?.stroke()
};

init();
