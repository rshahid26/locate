//run drag on mousedown and mouse movement events
document.getElementById("window_outer")
    .addEventListener("mousemove", drag());
document.getElementById("window_outer")
    .addEventListener("mousedown", drag());


function drag() {
    return console.log("moving!");
}