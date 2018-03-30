"use strict";

import Printer from "./Printer";
import RenderManager from "./RenderManager";

const COLOR_FIRST = "#41ff71";
const COLOR_SECOND = "#4013ff";
const SIZE_OF_GRID = 70;
const DIVISIONS = 14;
const AXES_NUMBER = 200;
const RENDER_COLOR = "#0d0d35";
const CAMERA_ANGLE = 60;
const BOX_CLASS_NAME = ".game-box";

export default class SceneManager {
    constructor(sceneWidth, sceneHeight, debugMode) {
        Printer.print("create SceneManager obj");
        // init size
        this.sceneWidth = sceneWidth;
        this.sceneHeight = sceneHeight;

        // create 3D world
        this.createScene();

        // init render manager
        this.renderManager = new RenderManager(this.scene, this.camera, this.renderer);

        // if debug mode
        if(debugMode === true) {
            // create grid and lines objects
            this.createGrid();
            this.createLines();
            // set top position of camera
            this.renderManager.setTopPositionOfCamera();
        } else {
            // set camera position behind car
            this.renderManager.setCameraWatchCar();
        }

        // draw scene
        this.renderManager.render();
    }

    createScene() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(CAMERA_ANGLE, this.sceneWidth / this.sceneHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(RENDER_COLOR);
        this.renderer.setSize(this.sceneWidth, this.sceneHeight);
        document.querySelector(BOX_CLASS_NAME).append(this.renderer.domElement);
    }

    createGrid() {
        const gridHelper = new THREE.GridHelper(SIZE_OF_GRID, DIVISIONS, COLOR_FIRST, COLOR_SECOND);
        this.scene.add(gridHelper);
    }

    createLines() {
        let axes = new THREE.AxisHelper(AXES_NUMBER);
        this.scene.add(axes);
    }

    getSceneMainParams() {
        return {
            scene: this.scene,
            camera: this.camera,
            renderer:this.renderer
        };
    }
}
