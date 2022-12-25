"use strict";
export function prepareData(element, resObject) {

    // Navigate from element to the associated chart canvas
    let canvas = element.parentElement.getElementsByClassName("chart_container")[0].lastElementChild;

    // Isolate data, split into iterable arrays
    resObject.data = resObject.data
        .replace(/(\r)/gm,'').split('volume')[1].split('\n').filter(n => n);

    for (let key in resObject.data)
        resObject.data[key] = resObject.data[key].split(',');

    console.log(resObject);
    createChart(canvas, resObject.data);
}

function createBars(data) {
    var open = +randomNumber(lastClose * 0.95, lastClose * 1.05).toFixed(2);
    var close = +randomNumber(open * 0.95, open * 1.05).toFixed(2);
    var high = +randomNumber(Math.max(open, close), Math.max(open, close) * 1.1).toFixed(2);
    var low = +randomNumber(Math.min(open, close) * 0.9, Math.min(open, close)).toFixed(2);
    return {
        x: date.valueOf(),
        o: open,
        h: high,
        l: low,
        c: close
    };
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

var barCount = 60;
var initialDateStr = '01 Apr 2017 00:00 Z';

//var canvas = document.getElementById('chart1').getContext('2d');

let barData2 = {

}
var barData = getRandomData(initialDateStr, barCount);

/*
var chart = new Chart(canvas, {
    type: 'candlestick',
    data: {
        datasets: [{
            label: 'HKD',
            data: barData
        }]
    }
});

 */

var getRandomInt = function(max) {
    return Math.floor(Math.random() * Math.floor(max));
};

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function randomBar(date, lastClose) {
    var open = +randomNumber(lastClose * 0.95, lastClose * 1.05).toFixed(2);
    var close = +randomNumber(open * 0.95, open * 1.05).toFixed(2);
    var high = +randomNumber(Math.max(open, close), Math.max(open, close) * 1.1).toFixed(2);
    var low = +randomNumber(Math.min(open, close) * 0.9, Math.min(open, close)).toFixed(2);
    return {
        x: date.valueOf(),
        o: open,
        h: high,
        l: low,
        c: close
    };

}

function getRandomData(dateStr, count) {
    var date = luxon.DateTime.fromRFC2822(dateStr);
    var data = [randomBar(date, 30)];
    while (data.length < count) {
        date = date.plus({days: 1});
        if (date.weekday <= 5) {
            data.push(randomBar(date, data[data.length - 1].c));
        }
    }
    return data;
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