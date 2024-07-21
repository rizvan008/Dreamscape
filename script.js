import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import gsap from 'gsap';
//**canvas for the 3d scene visuals
const canvas = document.querySelector('canvas.webgl');

//**required size for the 3d scene in the web page 
let size = {width: 800,hieght: 600};

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60,size.width/size.hieght,1,100);
camera.position.set(2,4,3);
scene.add(camera);

// **camera control behaviour
// const control = new THREE.OrbitControls(camera,canvas);
// scene.add(control);

// **creating 3d objects in the screen
const shape = new THREE.BoxGeometry(1,1,1);
const cover = new THREE.MeshBasicMaterial({color:""});
//**colour manipulation options
// cover.color = new THREE.Color(0xff00ff);
cover.color = new THREE.Color('skyblue');

// cover.color = new THREE.Color('rgb(250,0,0)');
// cover.color = new THREE.Color('hsl(95, 100%, 40%)');
const square = new THREE.Mesh(shape,cover);
camera.lookAt(square.position);
square.position.z=5;

//**bundling requierd object together
const cubes = [];
const group = new THREE.Group();
scene.add(group, square);

function creat(x,color,y,z ) {
const cover1 = new THREE.MeshBasicMaterial();
    const cube = new THREE.Mesh(shape,cover1);
    cube.position.set(x,y,z);
    cover1.color = new THREE.Color(color);
    cubes.push (cube);
    return cube;
}

group.add(creat(1.5,'red',.5),creat(-.5,'yellow',0),creat(-1.5,'green',-.5),creat(.50,'blue',0))
// group.add(creat(2,0xff0000),creat(-2,0x0000ff),creat(0,0x00ff00))

// **enlarging the size of objects
group.scale.set(1,2,0.5)

// **rotating the objects in their axis uing Euler
// group.rotateY (3.14*1)
group.rotation.y = 3.14
// group.rotation.z = 3.14
// group.rotation.x = 3.14

// **Example of rotation using Quaternion
// const quaternion = new THREE.Quaternion();
//   quaternion.multiply(new THREE.Quaternion(0,1,0, 0)); // Rotate around y-axis
//   group.quaternion.copy(quaternion);

//** find the measurements in between objects */
console.log(group.position.distanceTo(camera.position));
console.log(square.position.distanceTo(camera.position));
console.log(square.position.normalize());
console.log(cubes);


//**renderer/ project the vissuals in the web page

const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize(size.width,size.hieght);

square.material.wireframe = true;
const time = new THREE.Clock();

/** creating motions to objects */
function ani() {
    
    gsap.to(group?.position,{duration: 5, delay:1, x:2});
    gsap.to(group?.position,{duration:5, delay:3, x:0});
}
ani()

const animate = () => {
        group.rotateZ((Math.PI*(0.01)));
        const tic = time.getElapsedTime()
        square.position.y = Math.cos(tic)
        square.position.x = Math.sin(tic)*Math.cos(tic)
        renderer.render(scene,camera);
        window.requestAnimationFrame(animate)
    }
    
    animate();