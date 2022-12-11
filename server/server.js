const http = require('http');
const path = require('path');
const url = require('url');
const express = require('express');


// Development server
const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {

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

    // Send different cases
    if (req.url === '/')
        res.write('<h1>this is the home page response</h1>');
    else if (req.url !== '/favicon.ico') {

        let search = url.parse(req.url);
        console.log(search);

        let resObject = {
            symbol: search.query.split('&')[0].split('=')[1],
            time: search.query.split('&')[1].split('=')[1]
        }

        res.write(JSON.stringify(resObject));
    }

    res.writeHead(200, {'Content-Type': contentType});
    res.end();

});

server.listen(PORT, 'localhost', (error) => {

    if (error) {
        console.log('Something went wrong' + error);
    } else {
        console.log('server is running!');
    }

});