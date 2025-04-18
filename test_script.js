import * as THREE from "./node_modules/three/build/three.module";

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
// import {ARButton} from 'three/examples/jsm/webxr/ARButton.js';
import {ARButton} from "./node_modules/three/examples/jsm/webxr/ARButton.js";
let camera, scene, light, pointLight, sportLight, renderer;
let controller;
init();
animate();

function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.1, 100);
    pointLight = new THREE.PointLight('rgb(255, 255, 255)', 1, 50);
    pointLight.position.set(0, 3, 0);
    sportLight = new THREE.SportLight(0xffffff, 1, 60);
    sportLight.position.set(1, 5, 1);
    light = new THREE.DirectionalLight('white', 1);
    light.position.set(0, 2, 0);
    scene.add(camera, pointLight, sportLight, light);

    renderer = new THREE.WebGLRenderer({ antialias : true, alpha : true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true; // enable WebXR
    document.body.appendChild(renderer.domElement);
    

    //add AR Button for mobile
    document.body.appendChild(ARButton.createButton(renderer, {requiredFeatures : ['hit-test']}));

    //add 3D object
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1); 
    const material = new THREE.MeshBasicMaterial({color: 'red' });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    cube.visible = false; // hidden until placed in AR

    // load gtlb 3d files
    const loader = new GLTFLoader();
    let model;

    loader.load(
        'assets/LoadingSpinner.glb',
        (gltf) => {
            model = gltf.scene;
            model.scale.set(0.1, 0.1, 0.1);
            model.visible = false;
            scene.add(model);
        },
        undefined,
        (error) => {
            console.error('error loading model :', error);
        }
    )

    // tap to place integration
    controller = renderer.xr.getController(0);
    controller.addEventListener('select', (e) => {
    // if(cube.visible) return; // avoid placing multiple cubes
    cube.position.copy(controller.position);
    cube.quaternion.copy(controller.quaternion);
    cube.visible = true;

    if(model && !model.visible) {
        model.position.copy(controller.position.add(new THREE.vector3(0, 0.5, -0.5)));
        model.quaternion.copy(controller.quaternion);
        model.visible =true;
    }

    });
    
}

function animate (){
    renderer.setAnimationLoop(
        () => {
            
            renderer.render(scene, camera);
        });
}