/**
 * Several eventListeners here use anonymous callbacks and then almost immediately
 * pass in a declared function. This looks strange at first, but I've found it's
 * the best way to remove eventListeners later without memory waste or the use of
 * JQuery/external libraries.
 */
let div = document.getElementById("window_outer");

//draggable allow users to select and move #window_outer elements while holding shift
document.body.addEventListener("keydown", (e) => {
    if (e.code === "ShiftLeft" || e.code === "ShiftRight") {

        console.log("pressed shift");
        draggable(div);
    }
});

document.body.addEventListener("keyup", (e) => {
    if (e.code === "ShiftLeft" || e.code === "ShiftRight") {
        console.log("shift unpressed")

        try {
            div.removeEventListener("mousemove", mouseMoved);
            div.removeEventListener("mousedown", mousePressed);
            div.removeEventListener("mouseup", mouseUnpressed);

        } catch (e) {
            console.log(e);
        }
    }
});

function draggable(div) {
    //initialize position variables and assign on mousedown
    let x = 0;
    let y = 0;

    div.addEventListener("mousedown", (e) => {mousePressed(e, x, y)});
    div.addEventListener("mouseup", (e) => {mouseUnpressed(e, x, y)});
}


function mousePressed(e, x, y) {
    x = e.clientX;
    y = e.clientY;
    console.log(x + " " + y);

    div.addEventListener("mousemove", (e) => {mouseMoved(e, x, y)});
}

function mouseMoved(e, x, y) {
    if (!(x === 0 && y === 0)) {
        console.log("x:" + Number(e.clientX - x));
        console.log("y:" + Number(e.clientY - y));
    }
}


function mouseUnpressed(e, x, y) {
    div.removeEventListener("mousemove", mouseMoved);
    //div.removeEventListener("mouseup");
}
