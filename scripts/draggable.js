"use strict";

//make window_outer elements draggable after pressing tab
let tabPressed = false;

document.addEventListener("keydown", (e) => {
        if (e.code === "Tab") {

            tabPressed = true;

            for (let element of document.getElementsByClassName("window_outer"))
                dragElement(element);
        }
    });


export function dragElement(div) {
    if (tabPressed) {

        //declare variables for mousedown and mousemove positions
        let x1 = 0, y1 = 0,
            x2 = 0, y2 = 0;

        div.onmousedown = dragMouse;

        function dragMouse(e) {
            e.preventDefault();

            //get the mouse cursor position at startup
            x1 = e.clientX;
            y1 = e.clientY;

            //ensure mouse position is not in a ticker box
            for (let ticker of document.getElementsByClassName("ticker")) {

                //assign distance relative to ticker coordinates if appropriate
                let xDead = x1 > ticker.getBoundingClientRect().x ?
                    x1 - ticker.getBoundingClientRect().x : undefined;

                let yDead = y1 > ticker.getBoundingClientRect().y ?
                    y1 - ticker.getBoundingClientRect().y : undefined;

                //compare distances with width/height of any ticker box (all identical)
                if (xDead < ticker.getBoundingClientRect().width &&
                    yDead < ticker.getBoundingClientRect().height) {

                    ticker.focus();
                    return -1;

                }
            }

            //call functions based on cursor movement
            document.onmouseup = endDraggable;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e.preventDefault();

            //obtain new coordinates and their distances from the original
            x2 = x1 - e.clientX;
            y2 = y1 - e.clientY;
            x1 = e.clientX;
            y1 = e.clientY;

            //set the element's new position accordingly
            div.style.top = (div.offsetTop - y2) + "px";
            div.style.left = (div.offsetLeft - x2) + "px";
        }

        function endDraggable() {
            document.onmouseup = null;
            document.onmousemove = null;
        }

    }
}