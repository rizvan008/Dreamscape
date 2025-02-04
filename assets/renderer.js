import * as THREE from "three"

export let size = { width: 800, height: 600 };

//**canvas for the 3d scene visuals */
export const canvas = document.querySelector("canvas.webgl");

//** projecting the visuals in the web page */
export const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });

//**required size for the 3d scene in the web page */
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
