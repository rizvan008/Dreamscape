import { renderer } from "./renderer.js";
import { camera } from "./camera.js";
import { scene } from "./scene.js";
import { control_orbit } from "./control.js";
import { startMovement } from "./movements.js";
import * as THREE from "three"
import tank from "./tank.js";

const time = new THREE.Clock();

const animate = () => {
  const seconds = time.getElapsedTime();
  renderer.render(scene, camera);
  control_orbit.update();
  startMovement();
  window.requestAnimationFrame(animate);
  
};

export default animate