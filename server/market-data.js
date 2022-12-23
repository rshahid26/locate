'use strict';
const request = require('request');
module.exports = {loadData};

function loadData(obj) {

    const key = "CKEJIMJVB8FKOX6D";
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY_EXTENDED&symbol=${obj.symbol}&interval=15min&slice=year1month1&apikey=${key}`;

    request.get({
        url: url,
        json: true,
        headers: {
            'User-Agent': 'request'
        }

    }, (err, res, data) => {

        if (err || (res.statusCode !== 200)) {
            console.log('Status:', res.statusCode + ' Error:', err);
        } else {
            obj = obj + data;
            console.log(data);
        }
    });

}