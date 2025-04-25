import tank,{frontRightTyre, frontLeftTyre} from "./tank.js";
import { yard, containers, ground } from "./containers.js"
import lifter from "./lift.js";
import GSAP from "gsap";
import * as dat from "dat.gui";
import { scene } from "./scene.js";

export const DAT = new dat.GUI();

/** creating motions to objects */
function tick() {
DAT.add(yard.position, 'x').min(0).max(10).step(0.01).name('yard x-axis')
DAT.add(yard.position, 'y').min(0).max(10).step(0.01).name('yard y-axis')
DAT.add(yard, 'visible').name('yard visible')
DAT.add(frontRightTyre.material, 'wireframe').name('front Right tyre Wireframe')
const folder = DAT.addFolder("lifter")
folder.add(lifter, 'visible').name('lifter visible")')
folder.add(lifter.position, 'x').min(0).max(10).step(0.01)
folder.add(lifter.position, 'y').min(0).max(10).step(0.01)
folder.addColor(lifter.children[0].material, 'color').onChange((color) => { color = new THREE.Color('red') })
folder.add(lifter.children[0].material, 'side')
folder.add(lifter.children[0].material, 'wireframe')
// folder.add(tank.children[tank.children.length].position, 'y').min(0).max(10).step(0.01)
// folder.add(tank.children[tank.children.length].position, 'x').min(0).max(10).step(0.01)
folder.open();

}

  try{
    if (scene) {
      tick();
    }
  } catch (error) {
    console.error('error in DAT, debug.js : ', error);
  }