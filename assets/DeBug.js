import * as THREE from 'three'; 
import tank,{frontRightTyre, frontLeftTyre} from "./tank.js";
import { yard, containers, ground } from "./containers.js"
import lifter from "./liftModule.js";
import GSAP from "gsap";
import * as dat from "dat.gui";
import { scene } from "./scene.js";

export const DAT = new dat.GUI();

/** creating motions to objects */
function tick() {
const yardFolder = DAT.addFolder('yard items')
  yardFolder.add(yard.position, 'x').min(-10).max(10).step(0.01).name('yard x-axis')
  yardFolder.add(yard.position, 'y').min(0).max(10).step(0.01).name('yard y-axis')
  yardFolder.add(yard, 'visible').name('Yard visible').setValue(false)
const lifterFolder = DAT.addFolder("lifter module")
  lifterFolder.add(lifter, 'visible').name('lifter visible')
  lifterFolder.add(lifter.position, 'x').min(-10).max(10).step(0.01)
  lifterFolder.add(lifter.position, 'z').min(-10).max(10).step(0.01)
  lifterFolder.addColor(lifter.children[0].material, 'color').onFinishChange((color) => { new THREE.Color(`${color}`) })
  lifterFolder.add(lifter.children[0].material, 'wireframe')
const tankFolder = DAT.addFolder('Tank items')
const windShieldFolder = tankFolder.addFolder('Wind Shield')
  tankFolder.add(frontRightTyre.material, 'wireframe').name('Tyre Wireframe')
  windShieldFolder.add(tank.children[tank.children.length - 1].material, 'side').min(0).max(2).step(1).name('Shield visibility')
  windShieldFolder.add(tank.children[tank.children.length - 1].position, 'y').min(0).max(10).step(0.01)
  windShieldFolder.add(tank.children[tank.children.length - 1].position, 'x').min(0).max(10).step(0.01)
  // lifterFolder.open();

}

  try{
    if (scene) {
      tick();
    }
  } catch (error) {
    console.error('error in DAT, debug.js : ', error);
  }