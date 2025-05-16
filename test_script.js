import * as THREE from 'three' ;
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
// import {ARButton} from 'three/examples/jsm/webxr/ARButton.js';
import {ARButton} from "./node_modules/three/examples/jsm/webxr/ARButton.js";
import { XRButton } from 'three/examples/jsm/Addons.js';
let camera, sportLight, pointLight, light, scene, renderer;

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
    renderer.domElement.id = 'canvas'; // set id for the canvas element
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // set pixel ratio for high DPI displays
    renderer.setClearColor(0x000000, 0); // set transparent background
    
    
    //add AR Button for mobile
    document.body.appendChild(ARButton.createButton(renderer, {requiredFeatures : ['hit-test']}));
    document.body.appendChild(XRButton.createButton(renderer,{}));
    
    //add 3D object
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1); 
    const material = new THREE.MeshBasicMaterial({color: 'red' });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    cube.visible = false; // hidden until placed in AR
    // light.position.set(cube.position.add(new THREE.Vector3(0, 5, 0)));
    // light.castShadow = true; // enable shadow casting


    // load glb 3d files
    const loader = new GLTFLoader();
    let model;

    loader.load(
        '../static/DamagedHelmet.glb',
        // '../static/LoadingSpinner.glb',
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
    let controller = renderer.xr.getController(0);
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
            sportLight.position.add(model.position).add(new THREE.Vector3(-1, 1, 0));
            // sportLight.target = model; // set light target to the model
            sportLight.castShadow = true; // enable shadow casting
            let sportLight1 = sportLight.clone();
            sportLight1.position.copy(model.position).add(new THREE.Vector3(0, 2, 0));
            let sportLight2 = sportLight.clone();
            sportLight2.position.copy(model.position).add(new THREE.Vector3(0, -2, 0));
            sportLight2.target = model; // set light target to the model
            sportLight2.castShadow = true; // enable shadow casting
            pointLight.position.clone(model.position).add(new THREE.Vector3(0, 2, 0));
            scene.add(sportLight2.target); // add light target to the scene
            scene.add(sportLight, sportLight1, sportLight2); // add light to the scene
            light.castShadow = true; // enable shadow casting
        
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
