"use strict";

import Printer from "./Printer";

export default class SceneManager {
    constructor(sceneWidth, sceneHeight, debugMode) {
        Printer.print("create SceneManager obj");
        this.sceneWidth = sceneWidth;
        this.sceneHeight = sceneHeight;
        this.createScene();
        if(debugMode === true) {
            Printer.print("Debug mode TRUE");
            this.createGrid();
            this.createLines();
            this.setCameraWatchCar();
        } else {
            Printer.print("Debug mode FALSE");
        }
    }

    createScene() {
        const ww = this.sceneWidth;
        const hh = this.sceneHeight;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(60, ww / hh, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor("#28a3ff");
        this.renderer.setSize(ww, hh);
        const gameBox = document.querySelector(".game-box");
        gameBox.append(this.renderer.domElement);
        this.renderer.render(this.scene, this.camera);
    }

    createGrid() {
        const sizeOfGrid = 70;
        const divisions = 14;
        const color_1 = "#41ff71";
        const color_2 = "#4013ff";
        const gridHelper = new THREE.GridHelper(sizeOfGrid, divisions, color_1, color_2);
        this.scene.add(gridHelper);
    }

    createLines() {
        let axes = new THREE.AxisHelper(200);
        this.scene.add(axes);
    }

    setTopPositionOfCamera() {
        this.setCameraPosition(0, 80, 0);
    }

    setFrontCameraPosition() {
        this.setCameraPosition(0, 0, 80);
    }

    setCameraWatchCar() {
        this.setCameraPosition(0, 20, 45);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.renderer.render(this.scene, this.camera);
    }

    setCameraPosition(xx, yy, zz) {
        const camera = this.camera;
        camera.position.x = xx;
        camera.position.y = yy;
        camera.position.z = zz;
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.renderer.render(this.scene, this.camera);
    }

    getSceneMainParams() {
        return {
            scene: this.scene,
            camera: this.camera,
            renderer:this.renderer
        };
    }
}
