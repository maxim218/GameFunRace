"use strict";

export default class PositionManager {
    static setPosition(element, xx, yy, zz) {
        try {
            element.position.x = xx;
            element.position.y = yy;
            element.position.z = zz;
        } catch (err) {
            // err
        }
    }

    static moveAxisZ(element, zz) {
        try {
            element.position.z += zz;
        } catch (err) {
            // err
        }
    }
}
