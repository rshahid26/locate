const http = require('http');
const path = require('path');

// Development server
const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
    console.log(req.method, res.url);
    res.end('connected!');
});



server.listen(PORT, 'localhost', () => {

    console.log('server is running! on ${PORT}');

});