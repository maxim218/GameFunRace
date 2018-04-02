"use strict";

import Printer from "./Printer";
import SceneManager from "./SceneManager";
import GameElementsCreator from "./GameElementsCreator";
import ActionManager from "./ActionManager";

const DEBUG_MODE = false;
const GAME_SCREEN_WIDTH = 1000;
const GAME_SCREEN_HEIGHT = 750;

class Game {
    constructor() {
        Printer.line();
        Printer.print("create Game obj");
        this.sceneManager = new SceneManager(GAME_SCREEN_WIDTH, GAME_SCREEN_HEIGHT, DEBUG_MODE);
        this.gameElementsCreator = new GameElementsCreator(this.sceneManager.getSceneMainParams());
        this.actionManager = new ActionManager(this.sceneManager.getSceneMainParams(), this.gameElementsCreator);
        Printer.line();
    }
}

window.onload = () => {
    const game = new Game();
};
