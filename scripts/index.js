"use strict";
import * as marketData from "./market-data.js";

export function locate() {

    // Retrieve locate data on ticker entry
    const forms = document.getElementsByClassName("ticker_form");
    for (let element of forms)
        element.addEventListener("submit", (e) => {

            e.preventDefault();

            // Create URL from ticker entry
            const ticker = element.getElementsByClassName("ticker")[0].value.toUpperCase();
            const time = "DAY";
            const url = `http://localhost:8080/query?ticker=${ticker}&time=${time}`;

            console.log(url);
            // Send a get request to the new URL
            fetch(url, {method: "GET"})
                .then(response => {
                    return JSON.stringify(response);
                })
                .then(data => {
                    marketData.createChart(data);
                })
                .catch(error => {
                    console.log("catch " + error);
                });
        })

    // Auto-select input fields on submit
    for (let element of forms)
        element.addEventListener("submit", (e) => {

            element.getElementsByClassName("ticker")[0].select();
        })
    // Auto-select input fields on click
    const tickers = document.getElementsByClassName("ticker");
    for (let element of tickers)
        element.addEventListener("click", (e) => {

            element.select();
        })
}