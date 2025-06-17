import lifter from "./liftModule";
import { scene } from "./scene";
import tank from "./tank";
import { GridHelper } from "../help-worker/helpers";
tank.userData.attachable = true;
let keyPressHandler;
let moduleAttach = () => {
//** activate module when car is in the range, check whether the tank is attachable, 
if(tank.position.distanceTo(lifter.position) < 5 && lifter.userData.attachable){
    scene.add( GridHelper)
    if(!keyPressHandler){ // add event listener for keypress need to deactivate later
        keyPressHandler = (evn) => {
            if(evn.key == 'r'){
                tank.userData.attachable ? moveTillAttach(tank, lifter) : undefined; // this will move the tank to the lift module position
            }}
        document.addEventListener('keypress', keyPressHandler )
    }
}else{
    scene.remove( GridHelper);
    if(keyPressHandler){
        document.removeEventListener('keypress', keyPressHandler )
        keyPressHandler = undefined;
    }
}
//write detaching logic */
}
function findLocation(car, module){
    if (module.position.x > car.position.x){
        'module in positive x quadrant'
    }
    if (module.position.z > car.position.z){
        'module in positive z quadrant'
    }    
}
// grab location and check whether need to move, create moving logic*
export function moveTillAttach(car, module){
    const carPosition = car.position.clone();
    const modulePosition = module.position.clone();
// Check if the car is already at the module's position
    if( carPosition.equals(modulePosition)) { // validate whether car and module are in same position
        // module.parent.remove(scene.getObjectByName('GridHelper'));
        // module.removeFromParent();
        (scene.getObjectByName('tank').add(module));
        module.userData.attachable = false;
        car.userData.attachable = false;
        console.log(' Equals part :',scene);
    }else {
        const distance = (carPosition.distanceTo(modulePosition));
        console.log('distance: ', distance);
        const direction = modulePosition.sub(carPosition);
        console.log('direction: ', direction.toArray());
        // direction value never be exact zero, so we need to use normalized vector
        let direction_normalized = direction.normalize();
        const speed = 0.1; // Adjust the movement speed as needed
        const miniSpeedToMove = Math.min(speed, distance);
        
        //move till target location & attach to module,
        moveTo_target( car, module, direction, miniSpeedToMove);
        
    }
}

function moveTo_target(car, module, direction, miniSpeedToMove) {
//moving logic applied to car
car.position.add(direction.multiplyScalar(miniSpeedToMove));
console.log('movetill LOOP part :',scene);
// animation till module attachment
    window.requestAnimationFrame(() => moveTillAttach(car, module))
}

export default moduleAttach;