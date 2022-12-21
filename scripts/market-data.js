/*
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

 */

let iterator = 0;

export function marketData(element, ticker, time) {

    // Navigate from element to the associated chart canvas
    let canvas = element.parentElement.getElementsByClassName("chart_container")[0].lastElementChild;
    console.log(ticker + " " + time + " chart!");

    // Load dummy data
    dummy(canvas);

    stockMarketData(element, ticker, time);

}

function stockMarketData(element, ticker, time) {

    // Navigate from element to the associated chart canvas
    let canvas = element.parentElement.getElementsByClassName("chart_container")[0].lastElementChild;

    // Alpha Vantage API
    const key = "CKEJIMJVB8FKOX6D";
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY_EXTENDED
        &symbol=${ticker}&interval=15min&slice=year1month1&apikey=${key}`;

    fetch(url, {method: "GET"})
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })

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