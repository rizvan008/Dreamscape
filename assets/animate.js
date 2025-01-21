import { renderer } from "./renderer";
import { camera } from "./camera";
import { scene } from "./scene";
import { control } from "./control";
import { keyValue } from "./movements";
import * as THREE from "three"

export const time = new THREE.Clock();

export const animate = () => {
  const seconds = time.getElapsedTime();
  renderer.render(scene, camera);
  control.update();
  // console.table(keyValue);
  window.requestAnimationFrame(animate);

};

