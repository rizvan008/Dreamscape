import { renderer } from "./renderer.js";
import { camera } from "./camera.js";
import { scene } from "./scene.js";
import { control_orbit } from "./control.js";
import { startMovement } from "./movements.js";
import * as THREE from "three"
import tank from "./tank.js";

const time = new THREE.Clock();
const displayC = {};
export let display = window.visualViewport;

visualViewport.onresize = ()=>{
  displayC.scrollWidth = (window.document.body.scrollWidth);
  displayC.scrollHeight = (window.document.body.scrollHeight);
  displayC.clientWidth = (window.document.body.clientWidth);
  displayC.clientHeight = (window.document.body.clientHeight);
  displayC.scrollY = (window.document.body.scrollY);
  displayC.screen = (window.screen);
  displayC.innerHeight = (window.innerHeight);
  displayC.innerWidth = (window.innerWidth);
}

const animate = () => {
  const seconds = time.getElapsedTime();
  console.log('seconds: ', seconds);
  window.requestAnimationFrame(animate);
  control_orbit.update();
  renderer.render(scene, camera);
};

export default animate