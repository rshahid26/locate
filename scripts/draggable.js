//make window_outer elements draggable after pressing tab
let tabPressed = false;

document.addEventListener("keydown", (e) => {

        if (e.code === "Tab") {

            tabPressed = true;
            dragElement(document.getElementById("window_outer"));
        }
    });


function dragElement(div) {
    if (tabPressed) {

        let x1 = 0, y1 = 0,
            x2 = 0, y2 = 0;

        div.onmousedown = dragMouse;

        function dragMouse(e) {
            e = e || window.event;
            e.preventDefault();

            // get the mouse cursor position at startup:
            x1 = e.clientX;
            y1 = e.clientY;
            document.onmouseup = closeDragElement;

            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();

            // calculate the new cursor position:
            x2 = x1 - e.clientX;
            y2 = y1 - e.clientY;
            x1 = e.clientX;
            y1 = e.clientY;

            // set the element's new position:
            div.style.top = (div.offsetTop - y2) + "px";
            div.style.left = (div.offsetLeft - x2) + "px";
        }

        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
}