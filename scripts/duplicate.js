//import { draggable } from "./draggable.js";

//allow users to create multiple windows with Shift + C
document.addEventListener("keydown", shiftDown);
document.addEventListener("keyup", shiftUp);

let keyHistory = [];

//run duplicate() while a string of 'C's follow the shift key
function shiftDown(e) {

    if (e.code === "ShiftLeft" || e.code === "ShiftRight")
        keyHistory.push("shift");

    else if (e.code === "KeyC") {

        keyHistory.push(e.code);
        for (let i = keyHistory.length - 1; i >= 1; i--) {
            if (keyHistory[i] === "KeyC" && keyHistory[i-1] === "shift")
                duplicate();
        }
    }

    else keyHistory = [];
}

//reset the key history when shift is unpressed
function shiftUp(e) {
    if (e.code === "ShiftLeft" || e.code === "ShiftRight")
        keyHistory = [];
}

function duplicate() {
    console.log("test");

    let nextWindow = document.body.innerHTML;
    //import draggable module
    draggable(nextWindow);
    document.body.innerHTML += nextWindow;
    draggable(nextWindow);


}