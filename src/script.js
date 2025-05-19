// **importing the modules and libraries**
import * as THREE from 'three';
import { scene } from "../assets/scene.js";
import { camera, debug_camera } from "../assets/camera.js";
import { control_dragging } from "../assets/DragControls.js";
import { renderer } from "../assets/renderer.js";
import animate , {display, screenDetails} from "../assets/animate.js";
import tank ,{frontLeftTyre} from "../assets/tank.js";
import lifter from '../assets/liftModule.js'
import { moveTillAttach } from "../assets/moduleAttach.js";
import { yard, containers, ground } from "../assets/containers.js";
// import { GridHelper, AxesHelper,  } from "../help-worker/helpers.js";
import { GridHelper, AxesHelper, initCameraHelper, cameraHelper, cameraHelp } from "../help-worker/helpers.js";
import {DAT} from "../assets/DeBug.js";
import GSAP from "gsap";

import { injectSpeedInsights } from '@vercel/speed-insights';
injectSpeedInsights();

export let renderFlag = false;
try{
scene.add(tank, lifter, yard, ground, AxesHelper, camera, debug_camera, ); // do not change oder of adding the objects to the scene, it will affect the position of the objects in the scene
debug_camera.position.set(-10, 10, -10);
camera.position.set(10, 10, -10);
//** camera helpers */
initCameraHelper(camera) // this will resolve ReferenceError: Cannot access 'camera' before initialization
const debug_cameraHelp = cameraHelper(debug_camera); // "Recommended" way to solve error :- Cannot access 'camera' before initialization
scene.add(cameraHelp, debug_cameraHelp,);


// camera.lookAt(tank.position);
camera.lookAt(lifter.position);
debug_camera.lookAt(lifter.position);

// **enlarging size of objects */
// yard.scale.set(1, 2, 0.5);

// **rotating the objects in their axis using Euler */
// yard.rotateY (3.14 ); //180 degrees
// yard.rotateY (0.0174 * 180 ); //180 degrees
// group.rotateZ (3.14);

// //**Example of rotation using Quaternion */
// const quaternion = new THREE.Quaternion();
//   quaternion.multiply(new THREE.Quaternion(0,1,0, 0)); // Rotate around y-axis
//   group.quaternion.copy(quaternion);

//** find the measurements in between objects */
// console.log(yard.position.distanceTo(camera.position));

//* * calling the function to start the movement of the tank /
// document.onkeydown = ((event) => console.log('On key press : ', (event.code)));
// document.addEventListener( 'keypress', (e) => {
  document.onkeydown = ( 'keypress', (e) => {
  if (e.key === 'c' && !renderFlag){
      renderFlag = true;
      console.log('renderFlag: ', renderFlag);}
  else if (e.key === 'c' && renderFlag){
      renderFlag = false;
      console.log('renderFlag: ', renderFlag);}

});

console.log(scene);
console.log(containers[0].geometry);
console.log(containers[0].material);
console.log(tank);

animate();
// renderer.setAnimationLoop(); // this will call the animate function in a loop need test it with webXR
}
catch (error) {
  console.error('error from Script.js : ', error);
}
