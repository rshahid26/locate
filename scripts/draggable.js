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

        let x1 = 0, y1 = 0,
            x2 = 0, y2 = 0;

        div.onmousedown = dragMouse;

        function dragMouse(e) {
            e = e || window.event;
            e.preventDefault();

            //get the mouse cursor position at startup
            x1 = e.clientX;
            y1 = e.clientY;
            document.onmouseup = endDraggable;

            //call a function whenever the cursor moves
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
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