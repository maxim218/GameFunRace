"use strict";

import Printer from "./Printer";
import PositionManager from "./PositionManager";

const WALL_COLOR = "#266bff";
const SUN_COLOR = "#FFFFFF";
const SUN_FORCE = 2;
const GROUND_COLOR = "#2c7b95";

/**
 * класс для создания визуальных объектов игрового мира
 */
export default class GameElementsCreator {
    /**
     * конструктор
     * @param sceneMainParams - объект, в котором хранятся основные объекты для работы со сценой
     */
    constructor(sceneMainParams) {
        Printer.print("create GameElementsCreator obj");
        // инициализируем основные объекты для работой со сценой
        this.scene = sceneMainParams.scene;
        this.camera = sceneMainParams.camera;
        this.renderer = sceneMainParams.renderer;
        this.renderManager = sceneMainParams.renderManager;
        // создаём начальные визуальные объекты сцены (они всегда существуют)
        this.createFon();
        this.createSunLight();
        this.createPlain();
        this.createLeftAndRightWalls();
        this.createHeroCar();
    }

    /**
     * создание левой и правой стены
     */
    createLeftAndRightWalls() {
        const renderer = this.renderer;
        const camera = this.camera;

        /**
         * вспомогательная функция для создания одной стены
         * @param xx
         * @param yy
         * @param zz
         * @param scene
         */
        function createWall(xx, yy, zz, scene) {
            const cubeGeometry = new THREE.CubeGeometry(2, 1, 90);
            const cubeMaterial = new THREE.MeshLambertMaterial({color: WALL_COLOR});
            const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
            PositionManager.setPosition(cube, xx, yy, zz);
            scene.add(cube);
        }

        // создаём две стены
        createWall(-20, 0.5, 0, this.scene);
        createWall(20, 0.5, 0, this.scene);
    }

    /**
     * создаём источник света (аналог солнца)
     */
    createSunLight() {
        const pointLight = new THREE.PointLight(SUN_COLOR, SUN_FORCE);
        pointLight.position.set(0, 55, 30);
        this.scene.add(pointLight);
    }

    /**
     * создание плоскость, на которой будет ехать машинка
     */
    createPlain() {
        const planeGeometry = new THREE.PlaneGeometry(40, 90, 1, 1);
        const planeMaterial = new THREE.MeshLambertMaterial({color: GROUND_COLOR});
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = (-0.5) * Math.PI;
        PositionManager.setPosition(plane, 0, 0, 0);
        this.scene.add(plane);
    }

    /**
     * создание анимированной плоскости (движущийся задний фон)
     */
    createFon() {
        const loader = new THREE.TextureLoader();
        const img = "./../GameImages/gameFon.jpg";
        const repeatValue = 1;

        loader.load(img, (image) => {
            image.wrapS = THREE.RepeatWrapping;
            image.wrapT = THREE.RepeatWrapping;
            image.repeat.set(repeatValue, repeatValue);
            const planeGeometry = new THREE.PlaneGeometry(200, 140, 1, 1);
            const planeMaterial = new THREE.MeshLambertMaterial({map: image});
            const plane = new THREE.Mesh(planeGeometry, planeMaterial);
            PositionManager.setPosition(plane, 0, 0, -70);
            plane.rotation.x = -Math.PI * 0.15;
            this.scene.add(plane);
            this.fon = plane;
        });
    }

    /**
     * создание машинки - главного героя
     */
    createHeroCar() {
        const objectLoader = new THREE.ObjectLoader();
        objectLoader.load("./../GameModels/mycar.json", (car) => {
            PositionManager.setPosition(car, 0, 0, 25);
            this.scene.add(car);
            this.hero = car;
        } );
    }

    /**
     * инициализация массива врагов
     * @param enemies
     */
    initEnemies(enemies) {
        this.enemies = enemies;
    }

    /**
     * создание машинки - врага (синяя)
     * @param xx
     * @param zz
     */
    createCarEnemy(xx, zz) {
        const objectLoader = new THREE.ObjectLoader();
        objectLoader.load("./../GameModels/mycar_1.json", (car) => {
            PositionManager.setPosition(car, xx, 0, zz);
            this.scene.add(car);
            this.enemies.push(car);
        } );
    }
}
