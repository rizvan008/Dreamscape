// **importing the modules and libraries**
import { scene } from "../assets/scene.js";
import { camera, debug_camera } from "../assets/camera.js";
import { renderer } from "../assets/renderer.js";
import animate , {display, screenDetails} from "../assets/animate.js";
import tank ,{frontLeftTyre} from "../assets/tank.js";
import { yard, containers, plane } from "../assets/containers.js";
import { GridHelper,AxesHelper } from "../help-worker/helpers.js";
import {gs_p} from "../assets/DeBug.js";
import GSAP from "gsap";

import { injectSpeedInsights } from '@vercel/speed-insights';
injectSpeedInsights();
try{
scene.add(tank, lifter, yard, ground, AxesHelper, camera, debug_camera, ); // do not change oder of adding the objects to the scene, it will affect the position of the objects in the scene
debug_camera.position.set(-10, 10, -10);
camera.position.set(10, 10, -10);
scene.add(GridHelper,);

// tank.position.set(0,1,-1)
// camera.lookAt(tank.position);
// camera.lookAt(lifter);
// debug_camera.lookAt(tank.position);

// **enlarging size of objects */
yard.scale.set(1, 2, 0.5);

// **rotating the objects in their axis using Euler */
yard.rotateY (3.14 * 1); //180 degrees
// group.rotateZ (3.14);
// group.rotation.y = 3.14;
// group.rotation.z = Math.PI;
// group.rotation.x = 3.14 * 1;

// //**Example of rotation using Quaternion */
// const quaternion = new THREE.Quaternion();
//   quaternion.multiply(new THREE.Quaternion(0,1,0, 0)); // Rotate around y-axis
//   group.quaternion.copy(quaternion);

//** find the measurements in between objects */
// console.log(yard.position.distanceTo(camera.position));
// console.log(group.position.distanceTo(camera.position));

//* * calling the function to start the movement of the tank /
// document.onkeydown = (event) => startMovement(event.code);

console.log(scene);
console.log(containers[0].geometry);
console.log(containers[0].material);
console.log(tank);

animate();
// renderer.setAnimationLoop(); // this will call the animate function in a loop need test it with webXR
}
catch (error) {
  console.error('error in main.js : ', error);
}
