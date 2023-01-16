'use strict';
const request = require('request');
module.exports = {loadData, loadTitle};

function loadData(symbol) {
    return new Promise((resolve, reject) => {

        const key = 'CKEJIMJVB8FKOX6D';
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY_EXTENDED&symbol=${symbol}&interval=30min&apikey=${key}`;

        request.get({
            url: url,
            json: false,
            headers: {'User-Agent': 'request'}
        }, (err, res, data) => {
            if (err || (res.statusCode !== 200)) {
                console.log('Status:', res.statusCode + ' Data Error:', err);
                reject(err);
            } else {
                resolve(data);
            }
        });

    });
}

/*
Find symbol title by scraping yahoo finance
 */
function loadTitle(symbol) {
    return new Promise((resolve, reject) => {

        request.get({
            url: `https://www.finance.yahoo.com/quote/${symbol}?p=${symbol}&.tsrc=fin-srch`,
            headers: {
                'User-Agent': 'request',
                'Content-Type': 'text/html'
            }
        }, (err, res, body) => {
            if (err || (res.statusCode !== 200)) {
                console.log('Status:', res.statusCode + ' Title Error:', err);
                reject(err);
            } else {
                resolve(parseTitle(body, symbol));
            }
        });

    });
}

function parseTitle(body, symbol) {

    let origin = body.toString().indexOf(`(${symbol})`);
    let tag = '>';

    for (let i = 0; i < origin; i++) {
        if (body.substring(origin - i, origin).indexOf(tag) > -1)
            return body.substring(origin - i + tag.length, origin - 1);
    }

    console.log("not found!");
    return symbol + " Unknown";
}