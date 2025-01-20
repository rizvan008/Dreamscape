import * as THREE from "three"
import { size } from "./renderer";
import { group } from "./shapes";
import gsap from "gsap";


export const camera = new THREE.PerspectiveCamera(
  60,
  size.width / size.height,//size from render.js
  1,
  100
);

/** creating motions to objects */
function tick() {
  gsap.to(group.position, { duration: 5, delay: 1, x: 2 });
  gsap.to(group.position, { duration: 5, delay: 3, x: 0 });
}

try{
  if (group) {
    tick();
  }
} catch (error) {
  console.error(error);
}


