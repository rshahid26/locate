"use strict";
import {tickerCallback} from "./index.js";
import {dragElement} from "./draggable.js";

tickerCallback();
dragElement(document.getElementsByClassName("window_inner")[0]);

// Allow users to create multiple windows with Ctrl + c
let keyHistory = [];
document.addEventListener("keydown", ctrlDown);
document.addEventListener("keyup", ctrlUp);

// Run duplicate() while a string of 'c's follow the Ctrl key
function ctrlDown(e) {

    if (e.code === "ControlLeft" || e.code === "MetaLeft")
        keyHistory.push("ctrl");

    else if (e.code === "KeyC") {

        keyHistory.push(e.code);
        for (let i = keyHistory.length - 1; i >= 1; i--) {
            if (keyHistory[i] === "KeyC" && keyHistory[i-1] === "ctrl")
                duplicate();
        }
    }

    else keyHistory = [];
}

// Reset the key history when Ctrl is unpressed
function ctrlUp(e) {
    if (e.code === "ControlLeft" || e.code === "MetaLeft")
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
    dragElement(nextWindow.firstElementChild);

}