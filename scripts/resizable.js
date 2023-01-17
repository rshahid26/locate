"use strict";

export function resizeElement(div) {
    div.addEventListener("mousemove", (e) => {

        cursorStyle(div, e);
        console.log(div.style.cursor);
        //if (div.style.cursor.toString().indexOf("resize") > -1)
            //div.addEventListener("mousedown", resizeElement3(e));

    });

}
function resizeElement3(div, e) {
    div.addEventListener("mousedown", function resizeElement4(e) {

        let x1 = e.clientX,
            y1 = e.clientY;

        console.log("Mousedown", x1, y1);

        div.addEventListener("mouseup", (e) => {
            //e.preventDefault();

            // Obtain new coordinates and their distances from the original
            let xChange = Math.abs(x1 - e.clientX);
            let yChange = Math.abs(y1 - e.clientY);

            console.log("Mouseup", xChange, yChange);

            div.removeEventListener("mousedown", resizeElement4);
        })
    });

    if (div.style.cursor === "ns-resize") {
    }
}


function resizeElement2(div, e) {
    // Declare variables for mousedown and mousemove positions
    let x1 = 0, y1 = 0,
        x2 = 0, y2 = 0;

    div.onmousedown = dragMouse;


    function dragMouse(e) {
        e.preventDefault();

        // Get the mouse cursor position at startup
        x1 = e.clientX;
        y1 = e.clientY;

        // Call functions based on cursor movement
        document.onmousemove = drag;
        document.onmouseup = endDraggable;
    }

    function drag(e) {
        e.preventDefault();

        // Obtain new coordinates and their distances from the original
        x2 = x1 - e.clientX;
        y2 = y1 - e.clientY;
        x1 = e.clientX;
        y1 = e.clientY;

        // Set the element's new position accordingly
        div.style.height += (div.offsetTop - y2) + "px";
        div.style.top += (div.offsetLeft - x2) + "px";
    }

    function endDraggable() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function resizeVertical(div, e) {
}

function resizeHorizontal(div, e) {
}

function resizeDiagonal(div, e) {
}

function cursorStyle(div, e) {

    switch (closeTo(div, e)) {
        case "top":
        case "bottom":
            div.style.cursor = "ns-resize";
            resizeVertical(div, e);
            break;

        case "left":
        case "right":
            div.style.cursor = "ew-resize";
            resizeHorizontal(div, e);
            break;

        case "topright":
        case "bottomleft":
            div.style.cursor = "nesw-resize";
            resizeDiagonal(div, e);
            break;

        case "topleft":
        case "bottomright":
            div.style.cursor = "nwse-resize";
            resizeDiagonal(div, e);
            break;

        default:
            div.style.cursor = "initial";
            break;
    }
}

function closeTo(div, e) {

    let borderSide = "";

    if (Math.abs(div.getBoundingClientRect().top - e.clientY) < 5) borderSide += "top";
    if (Math.abs(div.getBoundingClientRect().bottom - e.clientY) < 5) borderSide += "bottom";

    if (Math.abs(div.getBoundingClientRect().left - e.clientX) < 5) borderSide += "left";
    if (Math.abs(div.getBoundingClientRect().right - e.clientX) < 5) borderSide += "right";

    return borderSide;

}