import gsap from "gsap";
import { yard } from "./shapes";

/** creating motions to objects */
function tick() {
    gsap.to(yard.position, { duration: 5, delay: 1, x: 2 });
    gsap.to(yard.position, { duration: 5, delay: 3, x: 0 });
  }
  
  try{
    if (yard) {
      tick();
    }
  } catch (error) {
    console.error(error);
  }