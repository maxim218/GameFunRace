"use strict";

import Printer from "./Printer";

// количество работающих интервалов
let workingIntervalsNumber = 0;

// функция для получения количества работающих интервалов
export function getWorkingIntervalsNumber() {
    return workingIntervalsNumber;
}

/**
 * класс для упрвления работой интервала
 */
export default class IntervalManager {
    /**
     * конструктор для создания переменной, отвечающей за интервал
     */
    constructor() {
        this.interval = 0;
    }

    /**
     * метод для остановки интервала
     */
    stop() {
        // уменьшаем количество работающих интервалов
        workingIntervalsNumber -= 1;
        // удаляем интервал
        clearInterval(this.interval);
        // выводим количество работающих интервалов
        Printer.print("Intervals working: " + workingIntervalsNumber);
    }

    /**
     * метод для запуска интервала
     * @param action - циклически вызывающаяся функция
     * @param time - время ожидания
     */
    start(action, time) {
        // увеличиваем количество работающих интервалов
        workingIntervalsNumber += 1;
        // запускаем интервал
        this.interval = setInterval(action, time);
        // выводим количество работающих интервалов
        Printer.print("Intervals working: " + workingIntervalsNumber);
    }
}
