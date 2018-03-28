"use strict";

import Printer from "./Printer";
import IntervalManager from "./IntervalManager";

export default class ActionManager {
    constructor(sceneMainParams, gameElementsCreator) {
        Printer.print("create ActionManager obj");
        this.scene = sceneMainParams.scene;
        this.camera = sceneMainParams.camera;
        this.renderer = sceneMainParams.renderer;
        this.gameElementsCreator = gameElementsCreator;
        this.initParams();
        this.intervalManager = new IntervalManager();
        this.startActions();
        this.addKeyEvents();
    }

    initParams() {
        this.angle = 0;
        this.left = false;
        this.right = false;
        this.position = 0;
    }

    addKeyEvents() {
        window.onkeydown = (event) => {
            const n = event.keyCode;
            if(n === 65) {
                if(this.left === false && this.position !== -2) {
                    this.left = true;
                    this.position -= 1;
                }
            }
            if(n === 68) {
                if(this.right === false && this.position !== 2) {
                    this.right = true;
                    this.position += 1;
                }
            }
        };

        window.onkeyup = (event) => {
            const n = event.keyCode;
            if(n === 65) {
                this.left = false;
            }
            if(n === 68) {
                this.right = false;
            }
        };
    }

    moveLeftOrRightHeroCar() {
        const hero = this.gameElementsCreator.hero;
        if(hero) {
           hero.position.x = this.position * 7;
        }
    }

    startActions() {
        this.intervalManager.start(() => {
            this.repeatingAction();
            this.renderer.render(this.scene, this.camera);
        }, 40);
    }

    repeatingAction() {
        this.moveFon();
        this.moveLeftOrRightHeroCar();
    }

    moveFon() {
        const fon = this.gameElementsCreator.fon;
        const radius = 4;
        if(fon) {
            this.angle += 0.03;
            fon.position.x = Math.cos(this.angle) * radius;
            fon.position.y = Math.sin(this.angle) * radius;
            if(this.angle > Math.PI * 4) {
                this.angle = 0;
            }
        }
    }
}
