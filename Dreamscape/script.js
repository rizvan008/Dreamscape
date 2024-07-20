import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

//canvas for the 3d scene visuals
const canvas = document.querySelector('canvas.webgl');

//required size for the 3d scene in the web page 
let size = {width: 800,hieght: 600};

console.log(size.width , size.hieght);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60,size.width/size.hieght,1,100);
camera.position.set(2,4,5);
camera.lookAt(0,0,0);
scene.add(camera);

// camera control behaviour
const control = new THREE.OrbitControls(camera);
scene.add(control);

// creating 3d objects in the screen
const shape = new THREE.BoxGeometry(1,1,1);
const cover = new THREE.MeshBasicMaterial({color:"skyblue"});
//colour manipulation options
// cover.color = new THREE.Color(0xff00ff);
// cover.color = new THREE.Color('yellow');
// cover.color = new THREE.Color('rgb(250,0,0)');
// cover.color = new THREE.Color('hsl(95, 100%, 40%)');
const square = new THREE.Mesh(shape,cover);
console.log(THREE);

scene.add(square);

//renderer/ project the vissuals in the web page
const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize(size.width,size.hieght);
renderer.render(scene,camera);