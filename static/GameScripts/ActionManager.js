"use strict";

import Printer from "./Printer";
import IntervalManager from "./IntervalManager";
import KeysController from "./KeysController";

const CAR_SIZE = 7;
const BACKGROUND_MOVE_RADIUS = 4;
const DELTA_ANGLE = 0.03;
const MAX_ANGLE = Math.PI * 4;
const START_SPEED = 1;
const FAST_INTERVAL_WORKING_SPEED = 30;
const LOW_INTERVAL_WORKING_SPEED = 500;

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
        // добавляем отслеживание нажатий на клавиши
        this.addKeyControlObj();
        // иницализируем начальный угол заднего фона
        this.initStartAngleOfBackground();
        // задаём начальную скорость врагов
        this.initStaringSpeed();
        // создаём массив врагов
        this.createEnemiesArray();
        // запускаем интервалы для вызовов функций через разные промеужтки времени
        this.startIntervals();
    }

    /**
     * метод для запуска интервалов
     */
    startIntervals() {
        // запускаем интервал, который выполняется через маленькие промежутки времени
        const fastInterval = new IntervalManager();
        fastInterval.start(() => {
            // движение заднего фона
            this.moveBackgroundPlain();
            // изменение положения героя
            this.moveHero();
            // отрисовываем трёхмерный мир
            this.renderManager.render();
        }, FAST_INTERVAL_WORKING_SPEED);

        // запускаем интервал, который выполняется через большие промежутки времени
        const lowInterval = new IntervalManager();
        lowInterval.start(() => {
            // выводим информацию о количестве объектов
            this.printNumberElements();
        }, LOW_INTERVAL_WORKING_SPEED);
    }

    /**
     * метод для создание массива врагов
     */
    createEnemiesArray() {
        // создаём массив врагов
        this.enemies = [];
        // передаём ссылку на массив врагов объекту, отвечающему за создание врагов
        this.gameElementsCreator.initEnemies(this.enemies);
    }

    /**
     * метод для задания начальной скорости движения врагов
     */
    initStaringSpeed() {
        // задаём начальную скорость врагов
        this.speed = START_SPEED;
    }

    /**
     * инициализиация начального угла заднего фона
     */
    initStartAngleOfBackground() {
        // обнуляем значение угла поворота
        this.angle = 0;
    }

    /**
     * метод для изменения положения заднего фона
     */
    moveBackgroundPlain() {
        // получаем указатель на фон (большую плоскость)
        const fon = this.gameElementsCreator.fon;
        // получаем радиус движения
        const radius = BACKGROUND_MOVE_RADIUS;
        // если фон существует
        if(fon) {
            // увеличиваем угол
            this.angle += DELTA_ANGLE;
            // высчитываем новое положение фона
            fon.position.x = Math.cos(this.angle) * radius;
            fon.position.y = Math.sin(this.angle) * radius;
            // если значение угла поворота превысило пороговое значение
            if(this.angle > MAX_ANGLE) {
                // обнуляем значение угла поворота
                this.angle = 0;
            }
        }
    }

    /**
     * метод для изменения положения героя
     */
    moveHero() {
        // получаем ссылку на героя
        const hero = this.gameElementsCreator.hero;
        // если герой существует
        if(hero) {
            // задаём положение героя в пространстве
            hero.position.x = this.position * CAR_SIZE;
        }
    }

    /**
     * добавляем события клавиатуры, чтобы отслеживать положение героя
     */
    addKeyControlObj() {
        // начальная позиция героя
        this.position = 0;
        // создаём объект для работы с клавиатурой
        // в конструктор передаются два колбека
        const keyController = new KeysController(() => {
            // если мы НЕ в крайней левой позиции
            if(this.position !== -2) {
                // двигаемся влево
                this.position--;
            }
        }, () => {
            // если мы НЕ в крайней правой позиции
            if(this.position !== 2) {
                // двигаемся вправо
                this.position++;
            }
        });
    }

    /**
     * метод для вывода количества элементов на сцене и в массиве врагов
     */
    printNumberElements() {
        // сообщение с информацией о количестве врагов
        const enemiesInfo = "E: " + this.enemies.length.toString();
        // сообщение с информацией о количестве объектов на сцене
        const sceneInfo = "S: " + this.scene.children.length.toString();
        // формируем итоговое сообщение
        const message = enemiesInfo + "  " + sceneInfo;
        // выводим сообщение на экран
        Printer.print(message);
    }

        /*
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


        this.generateIntervalManager.start(() => {
            this.createEnemiesLine();
            Printer.line();
            Printer.print("Enemies: " + this.enemies.length);
            Printer.print("Scene: " + this.scene.children.length);
            Printer.line();
        }, 1000);
    }
    */
}
