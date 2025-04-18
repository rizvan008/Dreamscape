import * as THREE from "./node_modules/three/build/three.module";

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
// import {ARButton} from 'three/examples/jsm/webxr/ARButton.js';
import {ARButton} from "./node_modules/three/examples/jsm/webxr/ARButton.js";
let camera, scene, renderer;
let controller;
init();
animate();

function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.1, 100);
    scene.add(camera);
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
        'assets/DamagedHelmet.glb',
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
    //cube.position.copy(controller.position);
  //  cube.quaternion.copy(controller.quaternion);
  //  cube.visible = true;

    if(model && !model.visible) {
         model.position.copy(controller.position);
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
