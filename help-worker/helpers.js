import * as THREE from "three";
import {ground} from "../assets/containers.js";

// export const CameraHelper = new THREE.CameraHelper( camera name );//test this
function createName(item) {
  return item.name = `${item.type}`;
}

export const AxesHelper = new THREE.AxesHelper(10);
createName(AxesHelper);
export const GridHelper = new THREE.GridHelper(10, 10);
createName(GridHelper);
export const PlaneHelper = new THREE.PlaneHelper(ground, 1, 0xffff00); //test this
createName(PlaneHelper);
// export const BoxHelper  = new THREE.BoxHelper(10, 10, 10); //test this
// export const cameraHelper = new THREE.CameraHelper(10);
// createName(cameraHelper);


/**lights */
// export const PointLightHelper = new THREE.PointLightHelper(light nme);
// export const DirectionalLightHelper = new THREE.DirectionalLightHelper(light nme);
// export const SpotLightHelper = new THREE.SpotLightHelper(light nme); //test this
// export const HemisphereLightHelper = new THREE.HemisphereLightHelper(light nme);

// export const ArrowHelper = new THREE.ArrowHelper(10); //test this
// // export const EdgesHelper = new THREE.EdgesHelper(10); //test this
// export const SkeletonHelper = new THREE.SkeletonHelper(10);

// export const PolarGridHelper = new THREE.PolarGridHelper(10, 10);
// export const Box3Helper = new THREE.Box3Helper(10, 10, 10);
