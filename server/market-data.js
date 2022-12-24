'use strict';
const request = require('request');
module.exports = {loadData};

function loadData(symbol) {
    return new Promise((resolve, reject) => {

        const key = "CKEJIMJVB8FKOX6D";
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY_EXTENDED&symbol=${symbol}&interval=daily&slice=year1month1&apikey=${key}`;

        request.get({
            url: url,
            json: false,
            headers: {'User-Agent': 'request'}
        }, (err, res, data) => {

            if (err || (res.statusCode !== 200)) {
                console.log('Status:', res.statusCode + ' Error:', err);
                reject(err);
            } else {
                resolve(data);
            }
        });

    });
}