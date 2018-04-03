"use strict";

import Printer from "./Printer";
import IntervalManager from "./IntervalManager";
import KeysController from "./KeysController";
import PositionManager from "./PositionManager";

// описание констант
const CAR_SIZE = 7;
const BACKGROUND_MOVE_RADIUS = 4;
const DELTA_ANGLE = 0.03;
const MAX_ANGLE = Math.PI * 4;
const START_SPEED = 1;
const FAST_INTERVAL_WORKING_SPEED = 30;
const LOW_INTERVAL_WORKING_SPEED = 600;
const START_ENEMY_POSITION = -40;

// массив линий из машинок
const LINES_ARRAY = [
    [0,0,0,1,1],
    [0,0,1,0,1],
    [0,0,1,1,0],
    [0,1,0,0,1],
    [0,1,0,1,0],
    [0,1,1,0,0],
    [1,0,0,0,1],
    [1,0,0,1,0],
    [1,0,1,0,0],
    [1,1,0,0,0],
];

// флаг окончания игры
let stop = false;

// количество набранных очков
let score = 0;

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
        // инициализация бокса для вывода количества очков
        this.initPointsLabel();
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
     * инициализиция бокса для вывода количества очков
     */
    initPointsLabel() {
        // инициализируем бокс для вывода количества очков
        this.pointsLabel = document.querySelector(".points-label");
        // выводим на экран количество очков
        this.pointsLabel.innerHTML = "Очки: " + score;
    }

    /**
     * метод для проверки столкновения главного героя с другими машинками
     */
    controlHit() {
        // ссылка на главного героя
        const hero = this.gameElementsCreator.hero;
        // если герой существует
        if(hero) {
            // получаем положение игрока
            const heroX = hero.position.x;
            const heroZ = hero.position.z;
            // задаём погрешность координат
            const deltaXX = 0.25;
            const deltaZZ = 4;
            // пробегаемся по всем вражеским машинкам
            this.enemies.forEach((enemy) => {
                // получаем координаты вражеской машинки
                const enemyX = enemy.position.x;
                const enemyZ = enemy.position.z;
                // ищем столкновение по оси X
                if(enemyX - deltaXX <= heroX && heroX <= enemyX + deltaXX) {
                    // ищем столкновение по оси Z
                    if(enemyZ - deltaZZ <= heroZ && heroZ <= enemyZ + deltaZZ) {
                        // останавливаем игру
                        stop = true;
                        // поворачиваем машинку, в которую врезались
                        enemy.rotation.y = Math.PI * -0.45;
                        // счётчик для подсчёта количества вызовов функции таймера
                        let count = 0;
                        // вызываем функцию циклически
                        let inter = setInterval(() => {
                            // увеличиваем позицию Y героя
                            hero.position.y += 0.5;
                            // увеличиваем угол поворота героя
                            hero.rotation.z += 0.1;
                            // отрисовывем сцену
                            this.renderManager.render();
                            // увеличиваем счётчик
                            count++;
                            // выводим значение счётчика на экран
                            console.log("Count: " + count);
                            // если счётчик достиг определённого значения
                            if(count >= 50) {
                                // очищаем интервал
                                clearInterval(inter);
                                // выводим надпись, что интервал очищен
                                console.log("Clear interval OK");
                                // делаем кнопку перезапуска видимой для пользователя игры
                                document.querySelector(".restart-btn").hidden = false;
                                // прячем кнопки A и D
                                // пробегемся по всем экземплярам класса
                                for(let i = 0; i < document.getElementsByClassName("key-button").length; i++) {
                                    // прячем блок
                                    document.getElementsByClassName("key-button")[i].hidden = true;
                                }
                            }
                        }, FAST_INTERVAL_WORKING_SPEED);
                    }
                }
            });
        }
    }

    /**
     * метод удаления машинок, которые уже уехали за границы игрового поля
     */
    deleteCars() {
        // пробегаемся по всем машинкам
        for(let i = 0; i < this.enemies.length; i++) {
            // если машинка существует
            if(this.enemies[i] !== null) {
                // если машинка слишком далеко уехала
                if (this.enemies[i].position.z > 55) {
                    // удаляем машинку со сцены
                    this.scene.remove(this.enemies[i]);
                    // обнуляем ссылку на машинку
                    this.enemies[i] = null;
                }
            }
        }

        // массив для хранения существующих машинок
        const buffer = [];
        // пробегаемся по массиву машинок
        this.enemies.forEach((enemy) => {
            // если ссылка на машинку не нулевая
            if(enemy !== null) {
                // кладём машинку в буффер
                buffer.push(enemy);
            }
        });

        // перезаписываем массив машинок
        this.enemies = buffer;
        // передаём ссылку на массив машинок объекту, отвечающему за создание 3D объектов
        this.gameElementsCreator.initEnemies(this.enemies);

        // выводим информацию о количестве объектов
        this.printNumberElements();
    }

    /**
     * метод для вывода информации о текущей скорости движения
     */
    printSpeedInfo() {
        // формируем тексовое сообщение для вывода
        const message = "Speed: " + this.speed;
        // печатаем сообщение в консоль
        Printer.print(message.toString());
    }

    /**
     * метод для создании линии из врагов
     */
    createLineOfEnemies() {
        /**
         * вспомогательная функция для генерации случайного числа
         * @param n
         * @returns {number}
         */
        function getRandomIntegerNumber(n) {
            // возвращаем случайное целое число на отрезке [0, n - 1];
            // само число N не входит в отрезок
            return parseInt(Math.random() * 10000) % n;
        }

        // получаем случайное целое число в пределах длины массива
        const r = getRandomIntegerNumber(LINES_ARRAY.length);
        // получаем случайную линию из массива
        const line = LINES_ARRAY[r];

        // пробегаемся по всей линии
        line.forEach((value, i, line) => {
            // если в данной ячейке нолик
            if (value === 0) {
                // вычисляем положение
                const personPosition = (i - 2) * CAR_SIZE;
                // создаём нового персонажа
                this.gameElementsCreator.createCarEnemy(personPosition, START_ENEMY_POSITION)
            }
        });
    }

    /**
     * метод для движения всех персонажей
     */
    moveAllEnemies() {
        // пробегаемся по всем врагам
        this.enemies.forEach((enemy) => {
            // двигаем врага по оси Z
            PositionManager.moveAxisZ(enemy, this.speed);
        });
    }

    /**
     * метод для запуска интервалов
     */
    startIntervals() {
        // запускаем интервал, который выполняется через маленькие промежутки времени
        const fastInterval = new IntervalManager();
        fastInterval.start(() => {
            if(stop === false) {
                // двигаем всех врагов
                this.moveAllEnemies();
                // движение заднего фона
                this.moveBackgroundPlain();
                // изменение положения героя
                this.moveHero();
                // проверяем столкновение
                this.controlHit();
                // отрисовываем трёхмерный мир
                this.renderManager.render();
            }
        }, FAST_INTERVAL_WORKING_SPEED);

        // запускаем интервал, который выполняется через большие промежутки времени
        const lowInterval = new IntervalManager();
        lowInterval.start(() => {
            if(stop === false) {
                // создаём линию из врагов
                this.createLineOfEnemies();
                // удаляем машинки, которые уже далеко уехали
                this.deleteCars();
                // увеличиваем количество набранных очков
                score++;
                // выводим на экран количество очков
                this.pointsLabel.innerHTML = "Очки: " + score;

            }
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
}
