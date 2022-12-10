const http = require('http');
const path = require('path');

// Development server
const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {

    // For test purposes, log these details to the terminal
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
    res.write('do i wanna know if the console worked?');
    res.end();

});



server.listen(PORT, 'localhost', (error) => {

    if (error) {
        console.log('Something went wrong' + error);
    } else {
        console.log('server is running!');
    }

});