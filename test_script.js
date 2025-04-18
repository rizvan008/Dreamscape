// import * as THREE from "./node_modules/three/build/three.module";
import * as THREE from 'three' ;
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
// import {ARButton} from 'three/examples/jsm/webxr/ARButton.js';
import {ARButton} from "./node_modules/three/examples/jsm/webxr/ARButton.js";
let camera, sportlight, pointlight, light, scene, renderer;
let controller;
init();
animate();

function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.1, 100);
    light = new THREE.DirectionalLight(0xffffff, 1);
    sportlight = new THREE.SpotLight(0xffffff, 1);
    pointlight = new THREE.PointLight(0xffffff, 1);
    scene.add(camera,light);
    renderer = new THREE.WebGLRenderer({ antialias : true, alpha : true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true; // enable WebXR
    document.body.appendChild(renderer.domElement);
    renderer.domElement.id = 'canvas'; // set id for the canvas element
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // set pixel ratio for high DPI displays
    renderer.setClearColor(0x000000, 0); // set transparent background
    
    
    //add AR Button for mobile
    document.body.appendChild(ARButton.createButton(renderer, {requiredFeatures : ['hit-test']}));
    
    //add 3D object
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1); 
    const material = new THREE.MeshBasicMaterial({color: 'red' });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    cube.visible = false; // hidden until placed in AR
    // light.position.set(cube.position.add(new THREE.Vector3(0, 5, 0)));
    // light.castShadow = true; // enable shadow casting


    // load gtlb 3d files
    const loader = new GLTFLoader();
    let model;

    loader.load(
        'assets/DamagedHelmet.glb',
        // 'assets/LoadingSpinner.glb',
        (gltf) => {
            model = gltf.scene;
            model.scale.set(0.1, 0.1, 0.1);
            model.visible = false;
            console.log('model: ', model);
            // model.scale.set(4, 4, 4); // scale the LoadingSpinner model to fit the scene
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
        // cube.position.copy(controller.position);
        // cube.quaternion.copy(controller.quaternion);
        // cube.visible = true;
        
        if(model && !model.visible) {
            model.position.copy(controller.position).add(new THREE.Vector3(0, 0, -0.2)); // set position of the model
            model.quaternion.copy(controller.quaternion);
            model.visible =true;
            light.position.copy(model.position).add(new THREE.Vector3(3, 3, 3));
            sportlight.position.add(model.position).add(new THREE.Vector3(-1, 1, 0));
            // sportlight.target = model; // set light target to the model
            sportlight.castShadow = true; // enable shadow casting
            let sportlight1 = sportlight.clone().position.copy(model.position).add(new THREE.Vector3(0, 2, 0));
            let sportlight2 = sportlight.clone().position.copy(model.position).add(new THREE.Vector3(0, -2, 0));
            pointlight.position.clone(model.position).add(new THREE.Vector3(0, 2, 0));
            light.target = model; // set light target to the model
            light.castShadow = true; // enable shadow casting
            scene.add(light.target); // add light target to the scene
            scene.add(sportlight, sportlight1, sportlight2); // add light to the scene
            // light.castShadow = true; // enable shadow casting
        
    }

   // if(cube.visible) return; // avoid placing multiple cubes
    //cube.position.copy(controller.position);
  //  cube.quaternion.copy(controller.quaternion);
  //  cube.visible = true;
});
}

function animate (){
    renderer.setAnimationLoop(
        () => {
            
            renderer.render(scene, camera);
        });
}
