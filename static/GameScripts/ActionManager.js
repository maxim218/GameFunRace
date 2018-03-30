"use strict";

import Printer from "./Printer";
import IntervalManager from "./IntervalManager";

/**
 * класс для управления процессом действия в игре
 */
export default class ActionManager {
    /**
     * конструктор
     * @param sceneMainParams - объект, в котором хранятся объекты для взаимодействия со сценой
     * @param gameElementsCreator - создатель объектов на сцене
     */
    constructor(sceneMainParams, gameElementsCreator) {
        Printer.print("create ActionManager obj");
        // инициализация объектов для взаимодействия со сценой
        this.scene = sceneMainParams.scene;
        this.camera = sceneMainParams.camera;
        this.renderer = sceneMainParams.renderer;
        this.renderManager = sceneMainParams.renderManager;
        // инициализация объекта для создание объектов в игре
        this.gameElementsCreator = gameElementsCreator;
        this.initParams();
        this.intervalManager = new IntervalManager();
        this.generateIntervalManager = new IntervalManager();
        this.startActions();
        this.addKeyEvents();
    }

    initParams() {
        this.angle = 0;
        this.left = false;
        this.right = false;
        this.position = 0;

        this.speed = 1;
        this.enemies = [];
        this.gameElementsCreator.initEnemies(this.enemies);
    }


    addKeyEvents() {

    }

    moveLeftOrRightHeroCar() {
        const hero = this.gameElementsCreator.hero;
        if(hero) {
           hero.position.x = this.position * 7;
        }
    }

    createEnemiesLine() {
        function getRandom() {
            return parseInt(Math.random() * 10000) % 10;
        }

        function makeCar(n, namespace) {
            namespace.gameElementsCreator.createCarEnemy_1(n * 7, -20);
        }

        function createLine(arr) {
            for(let i = 0; i < arr.length; i++) {
                if(arr[i] === 1) {
                    makeCar(i);
                }
            }
        }

    }

    moveAllEnemies() {
        this.enemies.forEach((enemy) => {
            enemy.position.z += this.speed;
        });
    }

    startActions() {
        this.intervalManager.start(() => {
            this.repeatingAction();
            this.renderer.render(this.scene, this.camera);
        }, 40);

        this.generateIntervalManager.start(() => {
            this.createEnemiesLine();
            Printer.line();
            Printer.print("Enemies: " + this.enemies.length);
            Printer.print("Scene: " + this.scene.children.length);
            Printer.line();
        }, 1000);
    }

    repeatingAction() {
        this.moveFon();
        this.moveLeftOrRightHeroCar();
        this.moveAllEnemies();
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
