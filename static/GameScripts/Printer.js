"use strict";

/**
 * класс для печати сообщений
 */
export default class Printer {
    /**
     * печать строки в консоль
     * @param message
     */
    static print(message) {
        console.log(message);
    }

    /**
     * печать искусственного разделителя в консоль
     */
    static line() {
        console.log("-----------------------------");
    }
}
