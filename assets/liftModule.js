import * as THREE from "three";
import { AxesHelper } from "../help-worker/helpers.js";
import  tank  from "./tank.js";  

// lift module need to replace with *.Glt file
const lifter = new THREE.Group();
lifter.name = "Lifter Group";

//**building module */ -- need to workout
let parent = tank.children[0].geometry.parameters;

function createModule (parent, color = 'rgb(243, 24, 24)') {
    const Module = new THREE.Mesh (
        new THREE.BoxGeometry( parent.width + 1, 0.25, 0.25) , new THREE.MeshBasicMaterial({color: color})
    );
    return Module;
}

//**creating lift module */

const liftModule = createModule(parent); // tank is provided for gaining default width for module
liftModule.name = 'lift Module';
// liftModule.material.color = new THREE.Color('rgb(24, 243, 79)');
liftModule.position.add(new THREE.Vector3(0, parent.height, -parent.depth * 0.75)) // default position set to module to fix the position in front of te car by centered

//** Later need to work on default position */
// const leftLift = rightLift.clone();
// leftLift.name = "Left lifter";
// leftLift.position.set(-0.25, 0, 0); // moving its geometric center to end

lifter.add(liftModule, )//rightLift, leftLift, liftHandle);
// lifter.position.copy(tank.children[0].position.clone())//.add(new THREE.Vector3(0, parent.height, -parent.depth)))
//** testing one direction at atime  */
// lifter.x = 0; 
// lifter.y = (rightLift.geometry.parameters.height/2 + car_body.height/2); 
// lifter.z = -5; 
// lifter.position.set(lifter.x, lifter.y, lifter.z);

lifter.userData.attachable = true;
lifter.userData.distance = lifter.position.length();

export default lifter;