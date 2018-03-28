"use strict";

import Printer from "./Printer";
import SceneManager from "./SceneManager";
import GameElementsCreator from "./GameElementsCreator";
import ActionManager from "./ActionManager";

class Game {
    constructor() {
        Printer.line();
        Printer.print("create Game obj");
        this.sceneManager = new SceneManager(1000, 750, false);
        this.gameElementsCreator = new GameElementsCreator(this.sceneManager.getSceneMainParams());
        this.actionManager = new ActionManager(this.sceneManager.getSceneMainParams(), this.gameElementsCreator);
        Printer.line();
    }
}

window.onload = () => {
    const game = new Game();
};
