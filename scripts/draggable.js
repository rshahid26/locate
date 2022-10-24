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
    div.addEventListener("mousedown", e => {

        let x = div.getBoundingClientRect().x;
        let y = div.getBoundingClientRect().y;

        console.log("(" + x + "," + y + ")");

        div.onmousemove = () => {

        }
    })
}

draggable(document.getElementById("window_outer"));