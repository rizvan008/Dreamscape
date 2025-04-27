import * as THREE from "three";
import { AxesHelper } from "../help-worker/helpers.js";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";

// **creating 3d objects - tank for screen */
const tank = new THREE.Group();
tank.name = "tank";

// **creating Geometry and material for items */
let cylinderDiameter = 0.5; // diameter of the cylinder
const cylinderHeight = 0.35; // height of the cylinder
const carShape = new THREE.BoxGeometry(1, 1, 3);
const carCover = new THREE.MeshBasicMaterial();
const tyreShape = new THREE.CylinderGeometry(cylinderDiameter, cylinderDiameter, cylinderHeight, 25);
const tyreCover = new THREE.MeshBasicMaterial({ color: "black" });
const grillShape = new THREE.CapsuleGeometry(0.05, 0.7);
const grillCover = new THREE.MeshBasicMaterial({ color: "black" });

// **creating cars-body and changing its color */
carCover.color = new THREE.Color("rgb(240, 224, 5)");
// carCover.color = new THREE.Color('hsl(263, 83.50%, 49.60%)'); //**color manipulation options */

const car = new THREE.Mesh(carShape, carCover);
car.position.set( 0, 1, -car.geometry.parameters.depth/2 * 0.5 ) // moving its geometric center to rear tyre position 
car.name = "tank-body";
//** creating windShield */
const windShield = new THREE.Mesh( new THREE.PlaneGeometry( car.geometry.parameters.width, 0.5), carCover.clone());
windShield.name = 'wind Shield';
windShield.material.color = new THREE.Color('white');
windShield.rotateX(0.01744 * 20)  // degree to radiant 
windShield.position.set(0, car.geometry.parameters.height/2 + 0.23, - (car.geometry.parameters.depth *.5 + 0.2));
windShield.material.side = THREE.DoubleSide; // make the wind shield visible from both sides
windShield.material.transparent = true;
windShield.material.opacity = 0.6 ; 

//**create tyres & numbering it */
const tyres = [];
console.log('tyres: ', tyres);

const createRoundShape = (x = 0, y = 0, z = 0, clone = false) => {
  let shapeCover = tyreCover;
  if (clone) { shapeCover = tyreCover.clone()}; // clone the material to avoid sharing the same material instance
  const RoundShape = new THREE.Mesh(tyreShape, shapeCover); 
  RoundShape.userData.name = `tyre${tyres.length + 1}`;
  RoundShape.position.set(x, y, z);
  RoundShape.rotation.z = Math.PI / 2;// rotting the tyre to 90 degree n z-axis
  if (!clone) {  //only tyres are pushed to array
    tyres.push(RoundShape);
  }
  return RoundShape;
};

//**create front grills & numbering it */
function createGrill( x= car.position.x + -0.01, y= car.position.y + 0.05, z= car.position.z + -1.5 ) { // need to provide dependent position for car body
  const grill = new THREE.Mesh(grillShape, grillCover);
  grill.name = "part of Grill";
  frontGrill.position.set( x, y, z );
  frontGrill.rotation.z = 3.14 / 2; // 90 degree - changed its xy axis
  return grill;
}

//tyres orientation with respect to the car body movement
car.userData = {
  width: car.geometry.parameters.width,
  height: car.geometry.parameters.height,
  depth: car.geometry.parameters.depth,
  x: car.position.x,
  y: car.position.y,
  z: car.position.z,
};

 const tyrePositionX = (car.userData.width/2 + cylinderHeight/2); // car.geometry.parameters.width / 2 + 0.175 // offset is half of the cylinder height/depth
 const tyrePositionY = (car.userData.height/2);      
 const tyrePositionZ = (car.userData.depth/2 * 0.5); // offset is half of the half car body
 const backTyreOffset = 0.17; // same offset given to x and y axis of the back tyre
const headlightSize = 0.25; // size/ scale of the head light
const headlightPositionX = 0.3;
const headlightPositionY = 0.3;
const headlightPositionZ = 1.47; 
const headLightColor = new THREE.Color("rgb(252, 249, 244)");

//**create head lights */
const rightHeadLight = createRoundShape(
  car.userData.x + headlightPositionX,
  car.userData.y + headlightPositionY,
  car.userData.z - headlightPositionZ, true, //** clone the material to avoid sharing the same material instance
);
rightHeadLight.name = "Right Head Light";
rightHeadLight.material.color = headLightColor

const leftHeadLight = createRoundShape(
  car.userData.x - headlightPositionX,
  car.userData.y + headlightPositionY,
  car.userData.z - headlightPositionZ, true,
);
leftHeadLight.name = "Left Head Light";
leftHeadLight.material.color = headLightColor

//** Creating Tyres */
const rearRightTyre =createRoundShape(
  car.userData.x + tyrePositionX , 
  car.userData.y - tyrePositionY,
  car.userData.z + tyrePositionZ 
);
rearRightTyre.name = "Rear Right Tyre";

export const rearLeftTyre =createRoundShape(
  car.userData.x - tyrePositionX,
  car.userData.y - tyrePositionY,
  car.userData.z + tyrePositionZ
);
rearLeftTyre.name = "Rear Left Tyre";

export const frontLeftTyre =createRoundShape(
  car.userData.x - tyrePositionX,
  car.userData.y - tyrePositionY,
  car.userData.z - tyrePositionZ 
);
frontLeftTyre.name = "Front Left Tyre";

export const frontRightTyre =
createRoundShape(
  car.userData.x + tyrePositionX,
  car.userData.y - tyrePositionY,
  car.userData.z - tyrePositionZ
);
frontRightTyre.name = "Front Right Tyre";

//**back Tyre  */
const backTyre = createRoundShape(
  car.userData.x - backTyreOffset,
  car.userData.y + (tyrePositionY - backTyreOffset),
  car.userData.z + (car.userData.depth/2 + cylinderHeight/2) // offset tiers depth / diameter
);
backTyre.name = "Back Tyre";

//** orientation of the Back tyres, front grill and head lights*/
backTyre.rotation.y = 3.14 / 2;

//**head lights orientation*/
leftHeadLight.scale.set(headlightSize, headlightSize, headlightSize);
rightHeadLight.scale.set(headlightSize, headlightSize, headlightSize);
leftHeadLight.rotation.y = 3.14 / 2; // 90 degree
rightHeadLight.rotation.y = 3.14 / 2;

//**front grill */
export const frontGrill = new THREE.Group();
frontGrill.name = "Front Grill";

frontGrill.add (createGrill(), createGrill(), createGrill());
frontGrill.children.map( (grill, indx) => {grill.position.x = indx * -0.15}) // spacing the grills one apart the other

tank.add(
  car,
  frontGrill,
  rightHeadLight,
  leftHeadLight, 
  frontLeftTyre,
  frontRightTyre,
  rearLeftTyre,
  rearRightTyre,
  backTyre,
  windShield,
);

// tank.position.y = 1; // moving the tank up to the ground level
// frontLeftTyre.add(new THREE.AxesHelper(3));
// frontRightTyre.add(new THREE.AxesHelper(3));
// tank.add(new THREE.AxesHelper(3));
// frontGrill.add(new THREE.AxesHelper(3));

export default tank;
