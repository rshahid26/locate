"use strict";
export function prepareData(element, resObject) {

    // Navigate from element to the associated chart canvas
    let canvas = element.parentElement.getElementsByClassName("chart_container")[0].lastElementChild;

    // Isolate data, split into iterable arrays
    resObject.data = resObject.data
        .replace(/(\r)/gm,'').split('volume')[1].split('\n').filter(n => n);

    for (let key in resObject.data) {
        resObject.data[key] = resObject.data[key].split(',');

        // Remove pre/post market data
        let intraDayTime = parseInt(resObject.data[key][0].split(' ')[1].substring(0, 5).replace(':', ''));
        if (intraDayTime < 930 || intraDayTime > 1600) delete resObject.data[key];
    }
    resObject.data = resObject.data.filter(n => n);
    console.log(resObject);

    let bars = createBars(resObject.data);
    createChart(canvas, bars);
    updateTitle(element, resObject.title);
    updateWidgets(element, bars);

}

function createBars(data) {

    let bars = [];
    for (let i = 0; i < data.length; i++) {

        bars[i] = {
            x: (new Date(data[i][0])).valueOf(),
            o: data[i][1],
            h: data[i][2],
            l: data[i][3],
            c: data[i][4]
        }

    }
    console.log(bars);
    return bars;
}

function createChart(canvas, bars) {

    // Refresh canvas before upload (chart.js requirement)
    canvas.outerHTML = `<canvas id=${canvas.id}>`;

    let chart = new Chart(canvas.id, {
        type: 'candlestick',
        data: {
            datasets: [{
                label: 'Last Month',
                data: bars,
                borderColor: 'rgb(0,0,0)',
                tension: .1,
                borderWidth: .01,
            }]
        },
        options: {
            /*
            scales: {
                x: {
                    type: 'time',
                    ticks: {
                        autoSkip: true,
                        autoSkipPadding: 50,
                        maxRotation: 0
                    },
                },
                y: {
                    type: 'linear'
                },
            },
             */
            plugins: {
                zoom: {
                    limits: {
                        x: {min: 'original', max: 'original', minRange: 60 * 3_000_000},
                        y: {min: 'original', max: 'original', minRange: 4}
                    },
                    pan: {
                        enabled: true,
                        mode: 'xy',
                        threshold: 5
                    },
                    zoom: {
                        wheel: {enabled: true, speed: 0.02},
                        pinch: {enabled: true},
                        mode: 'xy'
                    }}}}});
    return chart;
}

function updateTitle(element, title) {

    // Navigate from element to the associated widgets
    let titleContainer = element.getElementsByClassName("title")[0];
    titleContainer.innerText = `${title}`;

}

function updateWidgets(element, bars) {

    // Navigate from element to the associated widgets
    let widgets = element.parentElement.getElementsByClassName("widget_container")[0].children;

    // Calculate ranges from first day close, last day close, etc...
    let intervalEnd = parseFloat(bars[0].c);
    let intervalStart = parseFloat(bars[bars.length - 1].c);
    let intervalHigh = parseFloat(bars[0].h);
    let intervalLow = parseFloat(bars[0].l);

    for (let i = 0; i < bars.length; i++) {
        if (bars[i].h > intervalHigh) intervalHigh = parseFloat(bars[i].h);
        if (bars[i].l < intervalLow) intervalLow = parseFloat(bars[i].l);
    }

    widgets[0].innerText = intervalEnd.toFixed(2);
    widgets[1].innerText = ((intervalEnd - intervalStart) * 100 / intervalStart).toFixed(2) + "%";
    widgets[2].children[0].innerText = 'O ' + parseFloat(bars[0].o).toFixed(2);
    widgets[2].children[1].innerText = 'H ' + intervalHigh.toFixed(2);
    widgets[2].children[2].innerText = 'L ' + intervalLow.toFixed(2);
    widgets[2].children[3].innerText = 'C ' + intervalEnd.toFixed(2);

    for (let i = 0; i < 2; i++) intervalEnd < intervalStart ? widgets[i].style.color = 'red' : widgets[i].style.color = 'green';
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
        .catch(reject => console.log("FRED error ", reject));
}