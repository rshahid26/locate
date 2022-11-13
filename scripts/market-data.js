const API_KEY = "PKWAD3H9E57ARVV755NA";
const SECRET_KEY = "qU2qHN7QX1NQTK6bh4i4cM340x8z20WKAzRdIVu6";

fetch("https://data.alpaca.markets/v2/stocks/TSLA", {
    method: "GET",
    //"APCA-API-KEY-ID": API_KEY,
    //"APCA-API-SECRET-KEY": SECRET_KEY
})
    .then(response => {
        return response.json();
    })
    .catch(error => {
        console.log(error);
    })


//Federal Reserve Economic Data API (FRED)
const fred = "https://data.nasdaq.com/api/v3/datasets/FRED/NROUST?";
const appendKey = "api_key=QGc2a4qtCf1Efg_tK8fo";

export let raw;
fetch(fred + appendKey, {method: "GET"})
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log("\n" + data.dataset.name);
        console.log(data.dataset.oldest_available_date + " to " + data.dataset.newest_available_date);

        raw = data.dataset.data;
        return raw;
    })
    .then(raw => {

        for (let element of document.getElementsByClassName("chart_container")) {

            element.innerHTML =
                '<canvas id="chart1" style="width:400px;"></canvas>';
            createChart(raw);

        }

    })
    .catch(reject => console.log(reject));

export function createChart(raw) {
    let xValues = [];
    let yValues = [];

    for (let i = raw.length - 1; i > 0; i--) {
        xValues.push(raw[i][0]);
        yValues.push(raw[i][1]);
    }

    return new Chart("chart1", {
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