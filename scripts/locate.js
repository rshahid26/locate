// chart data from locate-data.js retrieved through index http request

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

/*

var barCount = 60;
var initialDateStr = '01 Apr 2017 00:00 Z';

var canvas = document.getElementById('chart1').getContext('2d');

var barData = getRandomData(initialDateStr, barCount);

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

function getRandomData(dateStr, count) {
    let date = luxon.DateTime.fromRFC2822(dateStr);
    let data = [randomBar(date, 30)];
    while (data.length < count) {
        date = date.plus({days: 1});
        if (date.weekday <= 5) {
            data.push(randomBar(date, data[data.length - 1].c));
        }
    }
    return data;
}

function randomBar(date, lastClose) {
    let open = +randomNumber(lastClose * 0.95, lastClose * 1.05).toFixed(2);
    let close = +randomNumber(open * 0.95, open * 1.05).toFixed(2);

    return {
        x: date.valueOf(),
        o: open,
        h: +randomNumber(Math.max(open, close), Math.max(open, close) * 1.1).toFixed(2),
        l: +randomNumber(Math.min(open, close) * 0.9, Math.min(open, close)).toFixed(2),
        c: close
    };
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}