"use strict";

import Printer from "./Printer";

export default class GameElementsCreator {
    constructor(sceneMainParams) {
        Printer.print("create GameElementsCreator obj");
        this.scene = sceneMainParams.scene;
        this.camera = sceneMainParams.camera;
        this.renderer = sceneMainParams.renderer;
        this.createSunLight();
        this.createPlain();
        this.createLeftAndRightWalls();
        this.createHeroCar();
    }

    createLeftAndRightWalls() {
        const renderer = this.renderer;
        const camera = this.camera;

        function createWall(xx, yy, zz, scene) {
            const loader = new THREE.TextureLoader();
            const img = "./../GameImages/wall.png";
            const repeatValue = 15;

            loader.load(img, (image) => {
                image.wrapS = THREE.RepeatWrapping;
                image.wrapT = THREE.RepeatWrapping;
                image.repeat.set(repeatValue, repeatValue);
                const cubeGeometry = new THREE.CubeGeometry(2, 1, 70);
                const cubeMaterial = new THREE.MeshLambertMaterial({map: image});
                const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
                cube.position.x = xx;
                cube.position.y = yy;
                cube.position.z = zz;
                scene.add(cube);
                renderer.render(scene, camera);
            });
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
        const loader = new THREE.TextureLoader();
        const img = "./../GameImages/road.png";
        const repeatValue = 10;

        loader.load(img, (image) => {
            image.wrapS = THREE.RepeatWrapping;
            image.wrapT = THREE.RepeatWrapping;
            image.repeat.set(repeatValue, repeatValue);
            const planeGeometry = new THREE.PlaneGeometry(70, 70, 1, 1);
            const planeMaterial = new THREE.MeshLambertMaterial({map: image});
            const plane = new THREE.Mesh(planeGeometry, planeMaterial);
            plane.rotation.x = (-0.5) * Math.PI;
            plane.position.x = 0;
            plane.position.y = 0;
            plane.position.z = 0;
            this.scene.add(plane);
            this.renderer.render(this.scene, this.camera);
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
        } );
    }
}

