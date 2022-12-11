"use strict";
import {createChart} from "./market-data";

// Retrieve locate data on ticker entry
const forms = document.getElementsByClassName("ticker_form");
for (let element of forms)
    element.addEventListener("submit", (e) => {

        e.preventDefault();

        // Create URL from ticker entry
        const ticker = element.getElementsByClassName("ticker")[0].value.toUpperCase();
        const time = "DAY";
        const url = `http://localhost:8080/query?ticker=${ticker}&time=${time}`;

        // Send a get request to the new URL
        fetch(url, {method: "GET"})
            .then(response => {
                return JSON.stringify(response);
            })
            .then(data => {
                createChart(data);
            })
            .catch(error => {
                console.log(error);
            });

        console.log(ticker + " " + time);

        // Auto-select input fields on submit
        element.getElementsByClassName("ticker")[0].select();
    })

// Auto-select input fields on click
const tickers = document.getElementsByClassName("ticker");
for (let element of tickers)
    element.addEventListener("click", (e) => {

        element.select();

    })