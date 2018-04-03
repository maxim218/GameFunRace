"use strict";

import Printer from "./Printer";
import SceneManager from "./SceneManager";
import GameElementsCreator from "./GameElementsCreator";
import ActionManager from "./ActionManager";

// описание констант
const DEBUG_MODE = false;
const GAME_SCREEN_WIDTH = 1000;
const GAME_SCREEN_HEIGHT = 750;

/**
 * класс для запуска работы других классов
 */
class Game {
    /**
     * консруктор для создания экземпляров классов
     */
    constructor() {
        Printer.line();
        Printer.print("create Game obj");
        // создаём объект для инициализации сцены
        this.sceneManager = new SceneManager(GAME_SCREEN_WIDTH, GAME_SCREEN_HEIGHT, DEBUG_MODE);
        // создаём объект для создания 3D элементов
        this.gameElementsCreator = new GameElementsCreator(this.sceneManager.getSceneMainParams());
        // создаём объект для управления действиями в игре
        this.actionManager = new ActionManager(this.sceneManager.getSceneMainParams(), this.gameElementsCreator);
        Printer.line();
    }
}

// при загрузке окна
window.onload = () => {
    // запускаем игру
    const game = new Game();
};
