"use strict";

import Printer from "./Printer";

class Game {
    constructor() {
        Printer.print("create Game obj");
    }
}

window.onload = () => {
    const game = new Game();
};