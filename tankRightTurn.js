import * as THREE from "three";

// //** turning axis for tank while moving */

export const tankRightTurn = new THREE.Object3D(); //testing the rotation of the tank
tankRightTurn.name = "tankRightTurn";

export const tankLeftTurn = new THREE.Object3D();
tankLeftTurn.name = "tankLeftTurn";

function freeobj(names,k){
    names = new THREE.Object3D();
    names.name = k
} 

function name(x=0,y=0) {
    console.log(`strt ${y}`) ;
    y++;
    if(x >= 10) return console.log(`hi ${--y}`) ;
    name(x+1, y); y-- ;console.log(`end ${y}`) ;
}