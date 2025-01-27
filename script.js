import * as THREE from "three";
import { scene } from "./assets/scene.js";
import { camera } from "./assets/camera.js";
import animate from "./assets/animate.js";
import tank ,{frontLeftTyre} from "./assets/tank.js";
import { yard, containers, plane } from "./assets/containers.js";
import { GridHelper,AxesHelper } from "./help-worker/helpers.js";
import { startMovement, keyValue } from "./assets/movements.js";
import { tankRightTurn } from "./tankRightTurn.js";

scene.add(camera, tank, yard, plane, AxesHelper);
camera.position.set(10, 10, -10);
// scene.add(GridHelper,);

tank.position.setY(1)

scene.add( tankRightTurn);


tank.add(new THREE.AxesHelper(3));
// tankRightTurn.add(new THREE.AxesHelper(3));
// tankLeftTurn.add(new THREE.AxesHelper(3));

// camera.lookAt(tank.position);
// **enlarging size of objects */
yard.scale.set(1, 2, 0.5);

// **rotating the objects in their axis using Euler */
yard.rotateY (3.14 * 1); //180 degrees
// group.rotateZ (3.14);
// group.rotation.y = 3.14;
// group.rotation.z = Math.PI;
// group.rotation.x = 3.14 * 1;

// **Example of rotation using Quaternion */
// const quaternion = new THREE.Quaternion();
//   quaternion.multiply(new THREE.Quaternion(0,1,0, 0)); // Rotate around y-axis
//   group.quaternion.copy(quaternion);

//** find the measurements in between objects */
// console.log(group.position.distanceTo(camera.position));
// console.log(square.position.distanceTo(camera.position));

// startMovement(); // calling the function to start the movement of the tank - done in the animate.js file

console.log(scene);
console.log(containers[0].geometry);
console.log(containers[0].material);
console.log(tank );

window.addEventListener("click",() =>console.log(keyValue));
window.addEventListener("click",() =>console.log(scene));
camera.lookAt(frontLeftTyre);
camera.lookAt(tank);
animate();
