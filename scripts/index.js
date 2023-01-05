"use strict";
import {prepareData} from "./market.js";

export function tickerCallback() {

    // Retrieve locate data on ticker entry
    const forms = document.getElementsByClassName("ticker_form");
    for (let element of forms)
        element.addEventListener("submit", (e) => {

            e.preventDefault();

            // Create URL from ticker entry
            const ticker = element.getElementsByClassName("ticker")[0].value.toUpperCase();
            const time = "DAY";
            const url = `http://localhost:8080/query?ticker=${ticker}&time=${time}`;

            console.log("Request sent to " + url);
            fetch(url, {method: "GET"})
                .then(response => {
                    return response.text();
                })
                .then(resObject => {
                    // Update UI
                    prepareData(element, JSON.parse(resObject));
                })
                .catch(error => {
                    console.log("Server market data: ", error);
                });
        })

    autoSelect();
}

function autoSelect() {

    // Auto-select input fields on submit
    const forms = document.getElementsByClassName("ticker_form");
    for (let element of forms)
        element.addEventListener("submit", () => {

            element.getElementsByClassName("ticker")[0].select();
        })
    // Auto-select input fields on click
    const tickers = document.getElementsByClassName("ticker");
    for (let element of tickers)
        element.addEventListener("click", () => {

            element.select();
        })
}

function reset() {

}