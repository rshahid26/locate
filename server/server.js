const http = require('http');
const path = require('path');
const express = require('express');


// Development server
const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {

    // For test purposes, log client info to the terminal
    console.log(req.method, req.url);
    console.log('bruh');

    // Determine extension of response based on request
    const extension = path.extname(req.url);
    let contentType;

    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        default:
            contentType = 'text/html';
            break;
    }

    res.writeHead(200, {'Content-Type': contentType});

    // Send different cases

    if (req.url === '/')
        res.write('<h1>this is the home page response</h1>');
    if (req.url === '/TSLA')
        res.write('{symbol: "TSLA", price: "405.00"}');

    res.end();

});



server.listen(PORT, 'localhost', (error) => {

    if (error) {
        console.log('Something went wrong' + error);
    } else {
        console.log('server is running!');
    }

});