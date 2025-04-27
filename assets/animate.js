import { renderer, } from "./renderer.js";
import { renderFlag} from '../src/script.js'

import { camera, debug_camera } from "./camera.js";
import { scene } from "./scene.js";
import { control_CamerasOrbit } from "./cameraControls.js";
import { startMovement } from "./tank-Controls.js";
import * as THREE from "three"

const time = new THREE.Clock();

export const screenDetails = { scrollWidth: 0, scrollHeight: 0 };

export let display = window.visualViewport;

let resizeTimeout;

visualViewport.onresize = ()=>{
  clearTimeout(resizeTimeout);

  resizeTimeout = setTimeout(() => {
    const width = visualViewport.width;
    const height = visualViewport.height;
    
    // Update Three.js after window resize
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

  screenDetails.scrollWidth = (document.body.scrollWidth);
  screenDetails.scrollHeight = (document.body.scrollHeight);
  screenDetails.clientWidth = (document.body.clientWidth);
  screenDetails.clientHeight = (document.body.clientHeight);
  screenDetails.scrollY = (window.scrollY);
  screenDetails.scrollX= (window.scrollX);
  screenDetails.screen = (window.screen);
  screenDetails.innerHeight = (window.innerHeight);
  screenDetails.innerWidth = (window.innerWidth);
  screenDetails.visualScale = visualViewport.scale;
  console.log('resized display: ', screenDetails);
}, 100); // time out given for smooth functioning in mobile devices and touch devices
};

const animate = () => {
  const seconds = time.getElapsedTime();
  // console.log('seconds: ', seconds);
  startMovement();
  control_CamerasOrbit.update();

  // window.requestAnimationFrame(animate);
  if (renderFlag){
        renderer.render(scene, debug_camera);
  }else {
    renderer.render(scene, camera);
  } 
  renderer.setAnimationLoop(animate) // test this for the animation loop

};

export default animate