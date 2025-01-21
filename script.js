import * as THREE from "three";
import { scene } from "./assets/scene";
import { camera } from "./assets/camera";
import { animate } from "./assets/animate";
import tank from "./assets/tank";
import { yard, containers, plane } from "./assets/containers";
import { grid,axis } from "./helpers";

camera.position.set(10, 10, -10);
// camera.lookAt(tank.position);

scene.add(camera, 
    // yard,
     tank, plane, axis);

// **enlarging size of objects */
yard.scale.set(1, 2, 0.5);

// **rotating the objects in their axis using Euler */
yard.rotateY (3.14 * 1);
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

console.log(containers[0]);
console.log(containers[0].geometry);
console.log(containers[0].material);

animate();
