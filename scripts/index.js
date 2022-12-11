"use strict";

// Retrieve locate data through http requests
const forms = document.getElementsByClassName("ticker_form");
for (let element of forms)
    element.addEventListener("submit", (e) => {

        e.preventDefault();

        const ticker = element.getElementsByClassName("ticker")[0]
            .value.toUpperCase();
        const time = "DAY";



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