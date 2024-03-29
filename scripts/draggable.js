"use strict";
let iterator = 1;

export function dragElement(div) {
    // Declare variables for mousedown and mousemove positions
    let x1 = 0, y1 = 0,
        x2 = 0, y2 = 0;

    div.onmousedown = dragMouse;
    
    function dragMouse(e) {
        e.preventDefault();
        riseToTop(div);

        // Get the mouse cursor position at startup
        x1 = e.clientX;
        y1 = e.clientY;

        // Exclude some parts of the window from listeners
        if (!excludeArea(x1, y1, div.getElementsByClassName("ticker")[0]) &&
            !excludeArea(x1, y1, div.getElementsByClassName("chart_container")[0])) {

            // Call functions based on cursor movement
            document.onmousemove = drag;
            document.onmouseup = endDraggable;

        }
    }

    function drag(e) {
        e.preventDefault();

        // Obtain new coordinates and their distances from the original
        x2 = x1 - e.clientX;
        y2 = y1 - e.clientY;
        x1 = e.clientX;
        y1 = e.clientY;

        // Set the element's new position accordingly
        let element = div.parentElement;
        element.style.top = (element.offsetTop - y2) + "px";
        element.style.left = (element.offsetLeft - x2) + "px";
    }
}

function endDraggable() {
    document.onmouseup = null;
    document.onmousemove = null;
}

function excludeArea(x1, y1, element) {

    // Assign distance relative to element coordinates if appropriate
    let xDead = x1 > element.getBoundingClientRect().x ?
        x1 - element.getBoundingClientRect().x : undefined;

    let yDead = y1 > element.getBoundingClientRect().y ?
        y1 - element.getBoundingClientRect().y : undefined;

    // Compare distances with width/height of any element box (all identical)
    if (xDead < element.getBoundingClientRect().width &&
        yDead < element.getBoundingClientRect().height) {

        element.focus();
        return true;
    }
}

function riseToTop(div) {
    div.parentElement.style.zIndex = `${iterator++}`;
}