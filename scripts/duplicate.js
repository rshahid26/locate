"use strict";
import * as draggable from "./draggable.js";
import {tickerCallback} from "./index.js";
import {dragElement} from "./draggable.js";

tickerCallback();
dragElement(document.getElementsByClassName("window_outer")[0]);

// Allow users to create multiple windows with Shift + c
let keyHistory = [];
document.addEventListener("keydown", shiftDown);
document.addEventListener("keyup", shiftUp);

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

let iterator = 1;
function duplicate() {

    let nextWindow = document.getElementsByClassName("window_outer")
        [document.getElementsByClassName("window_outer").length - 1];

    nextWindow.insertAdjacentHTML('afterend', nextWindow.outerHTML);

    // Reassign nextWindow in updated DOM
    nextWindow = document.getElementsByClassName("window_outer")
        [document.getElementsByClassName("window_outer").length - 1];

    nextWindow.style.top = "25%";
    nextWindow.style.left = "25%";

    // Update callbacks
    nextWindow.lastElementChild.getElementsByClassName('chart_container')[0]
        .lastElementChild.id = `chart${++iterator}`;
    tickerCallback();
    draggable.dragElement(nextWindow);

}