const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

// Funktion zum Lesen einer Datei
const readFile = (filePath, contentType, response) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            response.writeHead(404);
            response.end('404 Not Found');
        } else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(data);
        }
    });
};

// Erstellen eines Servers
http.createServer((req, res) => {
    if (req.method === 'GET') {
        if (req.url === '/' || req.url === '/index.html') {
            // HTML-Datei ausliefern
            readFile('./static/html/index.html', 'text/html', res);
        } else if (req.url.endsWith('.css')) {
            // CSS-Datei ausliefern
            readFile(`.${req.url}`, 'text/css', res);
        }
    } else if (req.method === 'POST') {
        // Daten aus dem Formular verarbeiten
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const formData = querystring.parse(body);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
                <html>
                <head><title>Formularergebnisse</title></head>
                <body>
                    <h1>Formular Eingaben</h1>
                    <p>Vorname: ${formData.firstname}</p>
                    <p>Nachname: ${formData.lastname}</p>
                    <p>Geburtsdatum: ${formData.birthday}</p>
                    <a href="/">Zurueck zum Formular</a>
                </body>
                </html>
            `);
        });
    }
}).listen(8000, () => {
    console.log('Server läuft auf http://localhost:8000');
});
