"use strict";

import Printer from "./Printer";

let workingIntervalsNumber = 0;

export function getWorkingIntervalsNumber() {
    return workingIntervalsNumber;
}

export default class IntervalManager {
    constructor() {
        this.interval = 0;
    }

    stop() {
        workingIntervalsNumber -= 1;
        clearInterval(this.interval);
        Printer.print("Intervals working: " + workingIntervalsNumber);
    }

    start(action, time) {
        workingIntervalsNumber += 1;
        this.interval = setInterval(action, time);
        Printer.print("Intervals working: " + workingIntervalsNumber);
    }
}
