import * as THREE from "three";
import { scene } from "./scene";

// **creating 3d objects in the screen */
const tank = new THREE.Group();
tank.name = "tank";
// **creating Geometry in the screen */
const tankBody = new THREE.BoxGeometry(1, 1, 3);
const tankTyre = new THREE.CylinderGeometry(0.5, 0.5, 0.35, 32);

// **creating material in the screen */
const carCover = new THREE.MeshBasicMaterial();
carCover.color = new THREE.Color("rgba(240, 224, 5, 0.5)");
// cover.color = new THREE.Color('hsl(263, 83.50%, 47.60%)'); //**color manipulation options */

const car = new THREE.Mesh(tankBody, carCover);
car.name = "car";
car.rotateY(3.14 / 2);
const tyres = [];
const tyreCover = new THREE.MeshBasicMaterial({ color: "black" });
const createTyre = (x, y, z) => {
  const tyre = new THREE.Mesh(tankTyre, tyreCover);
  scene.add(tyre);
  tyre.position.set(x, y, z);
  tyre.rotation.x = Math.PI / 2;
  tyres.push(tyre);
  return tyre;
};

// relative position of the group
const location = { x: tank.position.x, y: tank.position.y, z: tank.position.z };

const frontLeftTyre = createTyre(
  location.x - 1,
  location.y - 0.6,
  location.z + 0.73
);
frontLeftTyre.name = "frontLeftTyre";
console.log(frontLeftTyre.color);

const frontRightTyre = createTyre(
  location.x - 1,
  location.y - 0.6,
  location.z - 0.73
);
frontRightTyre.name = "frontRightTyre";
const backLeftTyre = createTyre(
  location.x + 1,
  location.y - 0.6,
  location.z + 0.73
);
backLeftTyre.name = "backLeftTyre";
const backRightTyre = createTyre(
  location.x + 1,
  location.y - 0.6,
  location.z - 0.73
);
backRightTyre.name = "backRightTyre";

const RightheadLight = createTyre(
  location.x - 1.5,
  location.y + 0.6,
  location.z + 0.3
);
RightheadLight.name = "RightheadLight";
const LeftheadLight = createTyre(
  location.x - 1.5,
  location.y + 0.6,
  location.z - 0.3
);
LeftheadLight.name = "LeftheadLight";

const rearTyre = createTyre(location.x + 1.6, location.y + 0.3, location.z);
rearTyre.name = "rearTyre";

//** orientation of the objects*/
LeftheadLight.scale.set(0.25, 0.25, 0.25);
RightheadLight.scale.set(0.25, 0.25, 0.25);
LeftheadLight.rotateZ(3.14 / 2);
RightheadLight.rotateZ(3.14 / 2);
rearTyre.rotateZ(3.14 / 2);

tank.add(
  car,
  frontLeftTyre,
  backLeftTyre,
  frontRightTyre,
  backRightTyre,
  rearTyre,
  RightheadLight,
  LeftheadLight
);

tank.position.setY(1.5);
export default tank;
