import { renderer } from "./renderer.js";
import { camera, debug_camera } from "./camera.js";
import { scene } from "./scene.js";
import { control_orbit } from "./cameraControls.js";
import { startMovement } from "./tank-Controls.js";
import * as THREE from "three"
import tank from "./tank.js";

const time = new THREE.Clock();

export const displayC = { scrollWidth: 0, scrollHeight: 0 };

export let display = window.visualViewport;

let resizeTimeout;

visualViewport.onresize = ()=>{
  clearTimeout(resizeTimeout);

  resizeTimeout = setTimeout(() => {
    const width = visualViewport.width;
    const height = visualViewport.height;
    
    // Update Three.js
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

  displayC.scrollWidth = (document.body.scrollWidth);
  displayC.scrollHeight = (document.body.scrollHeight);
  displayC.clientWidth = (document.body.clientWidth);
  displayC.clientHeight = (document.body.clientHeight);
  displayC.scrollY = (window.scrollY);
  displayC.scrollX= (window.scrollX);
  displayC.screen = (window.screen);
  displayC.innerHeight = (window.innerHeight);
  displayC.innerWidth = (window.innerWidth);
  displayC.visualScale = visualViewport.scale;
  console.log('resized display: ', displayC);
}, 100);
};

const animate = () => {
  const seconds = time.getElapsedTime();
  // console.log('seconds: ', seconds);
  startMovement();
  // window.requestAnimationFrame(animate);
  control_orbit.update();
  // renderer.render(scene, debug_camera);
  renderer.render(scene, camera);
  renderer.setAnimationLoop(animate) // test this for the animation loop
};

export default animate