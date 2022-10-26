//allow users to create multiple windows with Shift + C
document.addEventListener("keydown", shiftCheck);

let keyHistory = [];
console.log("bruh");

function shiftCheck(e) {

    if (e.code === "ShiftLeft" || e.code === "ShiftRight") {
        keyHistory.push("shift");
    }

    else if (e.code === "KeyC") {

        for (let i = keyHistory.length - 1; i >= 1; i--) {
            if (keyHistory[i] === "KeyC" && keyHistory[i-1] === "shift")
                duplicate(e);
        }
    }

    else keyHistory = [];
}

function duplicate(e) {
    console.log("duppy");
}