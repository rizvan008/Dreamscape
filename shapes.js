import * as THREE from "three"

// **creating 3d objects in the screen */
const shape = new THREE.BoxGeometry(1, 1, 1);
const cover = new THREE.MeshBasicMaterial({ color: "" });

//**color manipulation options */
cover.color = new THREE.Color("skyblue");
// cover.color = new THREE.Color(0xff00ff);
// cover.color = new THREE.Color('rgb(221, 12, 12)');
// cover.color = new THREE.Color('hsl(263, 83.50%, 47.60%)');

export const square = new THREE.Mesh(shape, cover);
square.material.wireframe = true;
square.position.z = 3;

//**creating required objects together */
export const cubes = [];
function create(x, color, y, z) {
  const cover1 = new THREE.MeshBasicMaterial();
  const cube = new THREE.Mesh(shape, cover1);
  cube.position.set(x, y, z);
  cover1.color = new THREE.Color(color);
  cubes.push(cube);// collecting for counts and calculations
  return cube;
}
//**bundling required object together */

export const group = new THREE.Group();
group.add(
  create(1.5, "red", 0.5),
  create(-0.5, "yellow", 0),
  create(-1.5, "green", -0.5),
  create(0.5, "blue", 0)
);

