const http = require('http');
const path = require('path');
const url = require('url');
const express = require('express');
const marketData = require("./market-data");
const locateData = require("./locate-data");

// Development server
const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {

    const extension = path.extname(req.url);
    // CORS TODO: remove in prod
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Send different cases
    if (req.url === '/') {
        res.write('<h1>this is the home page response</h1>');
        res.end();
    }

    else if (req.url !== '/favicon.ico') {

        let search = url.parse(req.url);
        console.log(search);

        let resObject = {
            symbol: search.query.split('&')[0].split('=')[1],
            time: search.query.split('&')[1].split('=')[1]
        }

        marketData.loadData(resObject.symbol)
            .then((data) => {
                resObject.data = data;

                // Append market data to resObject and send to user
                res.write(JSON.stringify(resObject));
                res.end();
            })
            .catch((err) => {
                console.log(err);
            });

        locateData.loadData(resObject.symbol)
            .catch((e) => {
                console.log(e);
            });
    }
});

server.listen(PORT, 'localhost', (error) => {

    if (error) {
        console.log('Server error: ' + error);
    } else {
        console.log('...');
    }

});