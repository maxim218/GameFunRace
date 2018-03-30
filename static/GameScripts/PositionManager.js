"use strict";

export default class PositionManager {
    static setPosition(element, xx, yy, zz) {
        element.position.x = xx;
        element.position.y = yy;
        element.position.z = zz;
    }

    static moveAxisZ(element, zz) {
        element.position.z += zz;
    }
}
