import { scene } from "./scene";
import { camera } from "./camera";
import { cubes, group, square } from "./shapes";
import { animate } from "./animate";
import { control } from "./control";

console.log(group);
camera.position.set(5, 5, 5);
camera.lookAt(group.position);

scene.add(camera, group, square, control);

// **enlarging size of objects */
group.scale.set(1, 2, 0.5);

// **rotating the objects in their axis using Euler */
group.rotateY (3.14 * 1);
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

console.log(cubes[0]);
console.log(cubes[0].geometry);
console.log(cubes[0].material);
/**gain access to the camera axis control inorder to move around */
window.addEventListener(MouseEvent, (Event) => {console.log('event happened')});
animate();
