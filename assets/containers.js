import * as THREE from "three";
import { grid } from "../helpers";

//**creating containers objects together */

export const containers = [];

const containerCover = new THREE.MeshBasicMaterial();
const containerGeometry = new THREE.BoxGeometry(1, 1, 3);

//place to store the containers
export const yard = new THREE.Group();
yard.name = "yard";

//**adding containers to the yard */
yard.add(
  createContainer("red", 1.5, 0.5),
  createContainer("yellow", -0.5, 0),
  createContainer("green", -1.5, -0.5),
  createContainer("blue", 0.5, 0)
);

//naming the each container
containers.map((e, i) => { e.name = "container" + i });

function createContainer(color, x, y, z) {
  const container = new THREE.Mesh(containerGeometry, containerCover);
  container.position.set(x, y, z);
  containerCover.color = new THREE.Color(color);
  containers.push(container); // collecting for counts and calculations
  return container;
}

export const plane = new THREE.Mesh( 
  new THREE.PlaneGeometry(20, 20), 
  new THREE.MeshBasicMaterial({color: "rgb(2, 82, 38)"})
);
plane.name = "ground";
plane.rotation.x = THREE.MathUtils.degToRad(-90);
