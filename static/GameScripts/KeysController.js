"use strict";

import Printer from "./Printer";

const KEY_LEFT = 65;
const KEY_RIGHT = 68;

/**
 * класс для отлавливания событий нажатия на клавиши
 */
export default class KeysController {
    /**
     * конструктор
     * @param callbackLeft - функция при нажатии на кнопку ВЛЕВО
     * @param callbackRight - функция при нажатии на кнопку ВПРАВО
     */
    constructor(callbackLeft, callbackRight) {
        Printer.print("create KeysController obj");
        // инициализируем флаги движения
        this.initLeftRight();
        // инициализируем колбеки
        this.initCallbacks(callbackLeft, callbackRight);
        // добавляем событие нажатия клавиш
        this.addKeyDownEvent();
        // добавляем событие отпускания клавиш
        this.addKeyUpEvent();
    }

    /**
     * инициализируем флаги движения
     */
    initLeftRight() {
        // говорим, что клавиши ВЛЕВО и ВПРАВО не нажаты
        this.left = false;
        this.right = false;
    }

    /**
     * инициализация колбеков
     * @param callbackLeft
     * @param callbackRight
     */
    initCallbacks(callbackLeft, callbackRight) {
        this.callbackLeft = callbackLeft;
        this.callbackRight = callbackRight;
    }

    /**
     * добавление события при нажатии на клавиши
     */
    addKeyDownEvent() {
        // при нажатии на клавишу
        window.onkeydown = (event) => {
            // получаем номер клавиши
            const n = event.keyCode;

            // если нажата левая клавиша, но до этого она не была нажата
            if(n === KEY_LEFT && this.left === false) {
                // делаем клавишу нажатой
                this.left = true;
                // вызываем колбек
                this.callbackLeft();
            }

            // если нажата правая клавиша, но до этого она не была нажата
            if(n === KEY_RIGHT && this.right === false) {
                // делаем клавишу нажатой
                this.right = true;
                // вызываем колбек
                this.callbackRight();
            }
        };
    }

    /**
     * добавление события отпускания клавиши
     */
    addKeyUpEvent() {
        // при отпускании клавиши
        window.onkeyup = (event) => {
            // получаем номер клавиши
            const n = event.keyCode;

            // если это левая клавиша
            if(n === KEY_LEFT) {
                // делаем клавишу НЕ нажатой
                this.left = false;
            }

            // если это правая клавиша
            if(n === KEY_RIGHT) {
                // делаем клавишу НЕ нажатой
                this.right = false;
            }
        };
    }
}
