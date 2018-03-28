"use strict";

import Printer from "./Printer";

export default class GameElementsCreator {
    constructor(sceneMainParams) {
        Printer.print("create GameElementsCreator obj");
        this.scene = sceneMainParams.scene;
        this.camera = sceneMainParams.camera;
        this.renderer = sceneMainParams.renderer;
        this.createFon();
        this.createSunLight();
        this.createPlain();
        this.createLeftAndRightWalls();
        this.createHeroCar();


        this.createCarEnemy_1(0, -20);
        this.createCarEnemy_1(7, -20);
        this.createCarEnemy_1(14, -20);
        this.createCarEnemy_1(-7, -20);
        this.createCarEnemy_1(-14, -20);
    }

    createLeftAndRightWalls() {
        const renderer = this.renderer;
        const camera = this.camera;

        function createWall(xx, yy, zz, scene) {
            const cubeGeometry = new THREE.CubeGeometry(2, 1, 90);
            const cubeMaterial = new THREE.MeshLambertMaterial({color: "#266bff"});
            const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
            cube.position.x = xx;
            cube.position.y = yy;
            cube.position.z = zz;
            scene.add(cube);
            renderer.render(scene, camera);
        }

        createWall(-20, 0.5, 0, this.scene);
        createWall(20, 0.5, 0, this.scene);
    }

    createSunLight() {
        const pointLight = new THREE.PointLight( "#FFFFFF", 2);
        pointLight.position.set( 0, 55, 30 );
        this.scene.add(pointLight);
    }

    createPlain() {
        const planeGeometry = new THREE.PlaneGeometry(40, 90, 1, 1);
        const planeMaterial = new THREE.MeshLambertMaterial({color: "#2c7b95"});
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = (-0.5) * Math.PI;
        plane.position.x = 0;
        plane.position.y = 0;
        plane.position.z = 0;
        this.scene.add(plane);
        this.renderer.render(this.scene, this.camera);
    }

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
            plane.position.x = 0;
            plane.position.y = 0;
            plane.position.z = -70;
            plane.rotation.x = -Math.PI * 0.15;
            this.scene.add(plane);
            this.renderer.render(this.scene, this.camera);
            this.fon = plane;
        });
    }

    createHeroCar() {
        const objectLoader = new THREE.ObjectLoader();
        objectLoader.load("./../GameModels/mycar.json", (car) => {
            car.position.x = 0;
            car.position.y = 0;
            car.position.z = 25;
            this.scene.add(car);
            this.renderer.render(this.scene, this.camera);
            this.hero = car;
        } );
    }

    createCarEnemy_1(xx, zz) {
        const objectLoader = new THREE.ObjectLoader();
        objectLoader.load("./../GameModels/mycar_1.json", (car) => {
            car.position.x = xx;
            car.position.y = 0;
            car.position.z = zz;
            car.rotation.y = Math.PI;
            this.scene.add(car);
            this.renderer.render(this.scene, this.camera);
        } );
    }
}

