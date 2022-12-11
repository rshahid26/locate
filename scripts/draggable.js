"use strict";

dragElement(document.getElementsByClassName("window_outer")[0]);

export function dragElement(div) {
    // Declare variables for mousedown and mousemove positions
    let x1 = 0, y1 = 0,
        x2 = 0, y2 = 0;

    div.onmousedown = dragMouse;

    function dragMouse(e) {
        e.preventDefault();

        // Get the mouse cursor position at startup
        x1 = e.clientX;
        y1 = e.clientY;

        // Ensure mouse position is not in a ticker box
        for (let ticker of document.getElementsByClassName("ticker")) {

            // Assign distance relative to ticker coordinates if appropriate
            let xDead = x1 > ticker.getBoundingClientRect().x ?
                x1 - ticker.getBoundingClientRect().x : undefined;

            let yDead = y1 > ticker.getBoundingClientRect().y ?
                y1 - ticker.getBoundingClientRect().y : undefined;

            // Compare distances with width/height of any ticker box (all identical)
            if (xDead < ticker.getBoundingClientRect().width &&
                yDead < ticker.getBoundingClientRect().height) {

                ticker.focus();
                return -1;

            }
        }

        // Call functions based on cursor movement
        document.onmouseup = endDraggable;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();

        // Obtain new coordinates and their distances from the original
        x2 = x1 - e.clientX;
        y2 = y1 - e.clientY;
        x1 = e.clientX;
        y1 = e.clientY;

        // Set the element's new position accordingly
        div.style.top = (div.offsetTop - y2) + "px";
        div.style.left = (div.offsetLeft - x2) + "px";
    }

    function endDraggable() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}