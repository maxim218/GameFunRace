"use strict";

/**
 * класс для задания позиции объекта
 */
export default class PositionManager {
    /**
     * метод для задания позиции объекта по 3-м осям
     * @param element
     * @param xx
     * @param yy
     * @param zz
     */
    static setPosition(element, xx, yy, zz) {
        // с помощью блока try, мы отлавливаем ошибку, если объект не существует
        try {
            // задаём положение объекта
            element.position.x = xx;
            element.position.y = yy;
            element.position.z = zz;
        } catch (err) {
            // err
        }
    }

    /**
     * метод для изменения позиции Z объекта
     * @param element
     * @param zz
     */
    static moveAxisZ(element, zz) {
        try {
            // изменяем положение по оси Z
            element.position.z += zz;
        } catch (err) {
            // err
        }
    }
}
