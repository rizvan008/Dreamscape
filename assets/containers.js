import * as THREE from "three";
import { PlaneHelper } from "../help-worker/helpers";
//place to store the containers
export const yard = new THREE.Group();
yard.name = "yard";

//**creating containers */
export const containers = [];

const containerShape = new THREE.BoxGeometry(1, 1, 3);
const containerCover = new THREE.MeshBasicMaterial({ color: "red", transparent: true, opacity: 0.5, wireframe: false, side: THREE.DoubleSide, depthTest: true, depthWrite: true });

// //overriding name for each container in the array******
// containers.map((e, i) => { e.name = "container" + i });

//**creating container objects together */
function createContainer(color = "white", x=0, y=0, z=0) {
  containerCover.color = new THREE.Color(color);
  const container = new THREE.Mesh(containerShape, containerCover.clone()); // clone done to have different materials for each containers 
  container.position.set(x, y, z);
  container.name = `container${containers.length + 1}`;  // providing name for each container
  containers.push(container); // collecting for counts and calculations
  return container;
}

//**adding containers to the yard */
yard.add( // remove hard coded values for color, x, y, z
  createContainer("pink", 1.5, 0.5),
  createContainer("rgb(15, 150, 240) ", -0.5, 0),
  createContainer("0xffffff", -1.5, -0.5),
  createContainer("blue", 0.5, 0)
);

export const ground = new THREE.Mesh( 
  new THREE.PlaneGeometry(20, 20), 
  new THREE.MeshBasicMaterial({color: "rgb(2, 82, 38)"})
);
ground.name = "Ground";
ground.rotation.x = THREE.MathUtils.degToRad(-90);  //angle in degrees
