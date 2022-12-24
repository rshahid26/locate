let iterator = 0;
export function prepareData(element, ticker, time) {

    // Navigate from element to the associated chart canvas
    let canvas = element.parentElement.getElementsByClassName("chart_container")[0].lastElementChild;

    // Load dummy data
    //dummy(canvas);

    //

}

function dummy(canvas) {

    // Federal Reserve Economic Data API
    const fred = "https://data.nasdaq.com/api/v3/datasets/FRED/NROUST?";
    const appendKey = "api_key=QGc2a4qtCf1Efg_tK8fo";

    fetch(fred + appendKey, {method: "GET"})
        .then(response => {
            return response.json();
        })
        .then(data => {
            return data.dataset.data;
        })
        .then(data => {
            createChart(canvas, data);
        })
        .catch(reject => console.log(reject));
}

function createChart(canvas, data) {
    let xValues = [];
    let yValues = [];

    for (let i = data.length - 1; i > 0; i--) {
        xValues.push(data[i][0]);
        yValues.push(data[i][1]);
    }

    return new Chart(canvas.id, {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: "rgba(0,0,0,0)",
                borderColor: "rgba(0,0,0,1)",
                data: yValues
            }]
        },
        options: null
    });
}