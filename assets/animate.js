import { renderer } from "./renderer.js";
import { camera } from "./camera.js";
import { scene } from "./scene.js";
import { control_orbit } from "./control.js";
import { startMovement } from "./movements.js";
import * as THREE from "three"
import tank from "./tank.js";

const time = new THREE.Clock();
export let display = {visualViewport: window.visualViewport};
window.visualViewport.onresize = ()=>{
  display.scrollWidth = (window.document.body.scrollWidth);
  display.scrollHeight = (window.document.body.scrollHeight);
  display.clientWidth = (window.document.body.clientWidth);
  display.clientHeight = (window.document.body.clientHeight);
  display.scrollY = (window.document.body.scrollY);
  display.screen = (window.screen);
  display.innerHeight = (window.innerHeight);
  display.innerWidth = (window.innerWidth);

}
const animate = () => {
  const seconds = time.getElapsedTime();
  renderer.render(scene, camera);
  control_orbit.update();
  startMovement();
  window.requestAnimationFrame(animate);
  
};

export default animate