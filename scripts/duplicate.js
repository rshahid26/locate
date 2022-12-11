"use strict";
import * as draggable from "./draggable.js";
import * as marketData from "./market-data.js";

// Allow users to create multiple windows with Shift + c
document.addEventListener("keydown", shiftDown);
document.addEventListener("keyup", shiftUp);

let keyHistory = [];

// Run duplicate() while a string of 'c's follow the shift key
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

// Reset the key history when shift is unpressed
function shiftUp(e) {
    if (e.code === "ShiftLeft" || e.code === "ShiftRight")
        keyHistory = [];
}

function duplicate() {

    let nextWindow = document.getElementsByClassName("window_outer")
        [document.getElementsByClassName("window_outer").length - 1];

    nextWindow.insertAdjacentHTML('afterend', nextWindow.outerHTML);

    // Reassign nextWindow in updated DOM
    nextWindow = document.getElementsByClassName("window_outer")
        [document.getElementsByClassName("window_outer").length - 1];

    // Set spawn coordinates
    nextWindow.style.top = "25%";
    nextWindow.style.left = "25%";

    // Apply exported function draggable
    draggable.dragElement(nextWindow);

}