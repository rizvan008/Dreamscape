/**gain access to the camera axis control in-order to move around */
import tank from "./tank";
// window.addEventListener( "mousemove", (Event) => {console.log('event happened')});

function startMovement() {
    if (keyValue.ArrowUp){
        tank.position.z += 0.1;
    }
    if (keyValue.ArrowDown){
        tank.position.z -= 0.1;
    }
    if(keyValue.ArrowLeft){
        tank.position.x -= 0.1;
    }
    if(keyValue.ArrowRight){
        tank.position.x += 0.1
    }
    if(spaceBar){
        jump()
    }
}
const time = 3;
function jump(time) {
    if( time != 8 ){
    tank.position.y = Math.cos(time)*2 + 1
    time++
    jump(time)
    }
}

export const keyValue = {};

window.addEventListener("keydown", (event) => {keyValue[event.key] = true} );
window.addEventListener("keyup", (event) => {keyValue[event.key] = false} );
