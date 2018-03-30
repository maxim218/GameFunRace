"use strict";

import PositionManager from "./PositionManager";
import Printer from "./Printer";

const DISTANCE = 80;
const CAMERA_X = 0;
const CAMERA_Y = 20;
const CAMERA_Z = 45;

/**
 * класс для отрисовки мира
 */
export default class RenderManager {
    /**
     * конструктор для инициализации сцены и её осонвных элементов
     * @param scene
     * @param camera
     * @param renderer
     */
    constructor(scene, camera, renderer) {
        Printer.print("create RenderManager obj");
        // init main objects of scene
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
    }

    /**
     * метод для отрисовки мира
     */
    render() {
        this.renderer.render(this.scene, this.camera);
    }

    /**
     * камера смотрит сверху на мир
     */
    setTopPositionOfCamera() {
        this.setCameraPosition(0, DISTANCE, 0);
    }

    /**
     * камера смотрит спереди на мир
     */
    setFrontCameraPosition() {
        this.setCameraPosition(0, 0, DISTANCE);
    }

    /**
     * камера находится сзади машинки
     */
    setCameraWatchCar() {
        this.setCameraPosition(CAMERA_X, CAMERA_Y, CAMERA_Z);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.renderer.render(this.scene, this.camera);
    }

    /**
     * метод для задания позиции камеры
     * @param xx
     * @param yy
     * @param zz
     */
    setCameraPosition(xx, yy, zz) {
        PositionManager.setPosition(this.camera, xx, yy, zz);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.renderer.render(this.scene, this.camera);
    }
}
