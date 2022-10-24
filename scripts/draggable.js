//run drag on mousedown and mouse movement events
/*
document.getElementById("window_outer")
    .addEventListener("mousemove", e => {
        drag(e);
    });
document.getElementById("window_outer")
    .addEventListener("mousedown", e => {

    });

 */


function draggable(div) {
    //save position variables on mousedown
    div.addEventListener("mousedown", updatePosition)

    div.addEventListener("mouseup", e => {
        div.removeEventListener("mousedown", updatePosition);
    })
}

function updatePosition(e, div) {
    let x = e.clientX;
    let y = e.clientY;

    console.log("(" + x + "," + y + ")");

    div.onmousemove = () => {
        console.log("x:" + e.clientX - x);
        console.log("y:" + e.clientY - y);
    }

    return null;
}

draggable(document.getElementById("window_outer"));