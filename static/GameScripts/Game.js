"use strict";

import Printer from "./Printer";
import SceneManager from "./SceneManager";
import GameElementsCreator from "./GameElementsCreator";

class Game {
    constructor() {
        Printer.line();
        Printer.print("create Game obj");
        this.sceneManager = new SceneManager(1000, 750, true);
        this.gameElementsCreator = new GameElementsCreator(this.sceneManager.getSceneMainParams());
        Printer.line();
    }
}

window.onload = () => {
    const game = new Game();
};
