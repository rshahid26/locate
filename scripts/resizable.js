"use strict";

export function resizeElement(div) {
    div.addEventListener("mousemove", (e) => {

        cursorStyle(div, e);

    });
}

function cursorStyle(div, e) {

    switch (closeTo(div, e)) {
        case "top":     div.style.cursor = "ns-resize"; break;
        case "left":    div.style.cursor = "ew-resize"; break;
        case "bottom":  div.style.cursor = "ns-resize"; break;
        case "right":   div.style.cursor = "ew-resize"; break;

        case "topleft":     div.style.cursor = "nwse-resize"; break;
        case "topright":    div.style.cursor = "nesw-resize"; break;
        case "bottomleft":  div.style.cursor = "nesw-resize"; break;
        case "bottomright": div.style.cursor = "nwse-resize"; break;

        default:
            div.style.cursor = "initial";
            break;
    }
}

function closeTo(div, e) {

    let borderSide = "";

    if (Math.abs(div.getBoundingClientRect().top - e.clientY) < 4) borderSide += "top";
    if (Math.abs(div.getBoundingClientRect().bottom - e.clientY) < 4) borderSide += "bottom";

    if (Math.abs(div.getBoundingClientRect().left - e.clientX) < 4) borderSide += "left";
    if (Math.abs(div.getBoundingClientRect().right - e.clientX) < 4) borderSide += "right";

    return borderSide;

}

function resizeVertical(div, e) {

}

function resizeHorizontal(div, e) {

}

function resizeDiagonal(div, e) {

}