import { yard, tank,tankLeftTurn,tankRightTurn } from "./shapes.js";
import gsap from "gsap";

/** creating motions to objects */
function tick() {
    gsap.to(yard.position, { duration: 5, delay: 1, x: 2 });
    gsap.to(yard.position, { duration: 5, delay: 3, y: 2 });
  }
  
  try{
    if (yard) {
      tick();
    }
  } catch (error) {
    console.error(error);
  }