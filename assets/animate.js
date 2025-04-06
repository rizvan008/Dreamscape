import { renderer } from "./renderer.js";
import { camera } from "./camera.js";
import { scene } from "./scene.js";
import { control_orbit } from "./DragControls.js";
import { startMovement } from "./tank_controls.js";
import * as THREE from "three"
import tank from "./tank.js";

const time = new THREE.Clock();
const displayC = {scrollWidth: 0,
  scrollHeight: 0,};
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
  // displayC.scrollY = (document.body.scrollY);
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
  window.requestAnimationFrame(animate);
  control_orbit.update();
  renderer.render(scene, camera);
};

export default animate