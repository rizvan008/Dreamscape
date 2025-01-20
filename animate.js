import { group } from "./shapes";
import { renderer } from "./renderer";
import { camera } from "./camera";
import { scene } from "./scene";
import * as THREE from "three"

export const time = new THREE.Clock();

export const animate = () => {
  // group.rotateZ(Math.PI * 0.01);
  group.rotation.z += (Math.PI * 0.01);

  const seconds = time.getElapsedTime();
  // square.position.y = Math.cos(seconds) * 2;
  // square.position.x = Math.sin(seconds) * Math.cos(seconds) * 2;
  // camera.lookAt(square.position);
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};

