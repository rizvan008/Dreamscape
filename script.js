import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import gsap from "gsap";

//**canvas for the 3d scene visuals */
const canvas = document.querySelector("canvas.webgl");

//**required size for the 3d scene in the web page */
let size = { width: 800, height: 600 };

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60,
  size.width / size.height,
  1,
  100
);

camera.position.set(2, 4, 5);
scene.add(camera);

// **camera control behavior */
// const control = new THREE.OrbitControls(camera,canvas);
// scene.add(control);

// **creating 3d objects in the screen */
const shape = new THREE.BoxGeometry(1, 1, 1);
const cover = new THREE.MeshBasicMaterial({ color: "" });

//**color manipulation options */
cover.color = new THREE.Color("skyblue");
// cover.color = new THREE.Color(0xff00ff);
// cover.color = new THREE.Color('rgb(250,0,0)');
// cover.color = new THREE.Color('hsl(95, 100%, 40%)');

const square = new THREE.Mesh(shape, cover);
square.material.wireframe = true;
square.position.z = 3;

//**creating required objects together */
const cubes = [];

function create(x, color, y, z) {
    const cover1 = new THREE.MeshBasicMaterial();
    const cube = new THREE.Mesh(shape, cover1);
    cube.position.set(x, y, z);
    cover1.color = new THREE.Color(color);
    cubes.push(cube);
    return cube;
}

//**bundling required object together */
const group = new THREE.Group();

group.add(
  create(1.5, "red", 0.5),
  create(-0.5, "yellow", 0),
  create(-1.5, "green", -0.5),
  create(0.5, "blue", 0)
);

scene.add(group, square);
console.log(group);

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
console.log(group.position.distanceTo(camera.position));
console.log(square.position.distanceTo(camera.position));

console.log(square.position.normalize());
console.log(cubes);

//** projecting the visuals in the web page */

const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(size.width, size.height);

const time = new THREE.Clock();

/** creating motions to objects */
try {
  function tick() {
    gsap.to(group?.position, { duration: 5, delay: 1, x: 2 });
    gsap.to(group.position, { duration: 5, delay: 3, x: 0 });
  }
  tick();
} catch (error) {
  console.log(error);
}
camera.lookAt(group.position);

const animate = () => {
  // group.rotateZ(Math.PI * 0.01);
  group.rotation.z+=(Math.PI * 0.01);
  
  const seconds = time.getElapsedTime();
  square.position.y = Math.cos(seconds)*2;
  square.position.x = Math.sin(seconds) * Math.cos(seconds)*2;
  // camera.lookAt(square.position);
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};

animate();
