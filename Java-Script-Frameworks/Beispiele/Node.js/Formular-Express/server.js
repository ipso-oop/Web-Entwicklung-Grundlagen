const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Middleware für statische Dateien (CSS, HTML)
app.use(express.static(path.join(__dirname, 'static')));

// Middleware für das Verarbeiten von Formularen
app.use(bodyParser.urlencoded({ extended: true }));

// Route für GET-Anfragen (zeigt das Formular an)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/html/index.html'));
});

// Route für POST-Anfragen (verarbeitet die Formulardaten)
app.post('/', (req, res) => {
    const formData = req.body;
    res.send(`
        <html>
        <head><title>Formularergebnisse</title></head>
        <body>
            <h1>Formular Eingaben</h1>
            <p>Vorname: ${formData.firstname}</p>
            <p>Nachname: ${formData.lastname}</p>
            <p>Geburtsdatum: ${formData.birthday}</p>
            <a href="/">Zurück zum Formular</a>
        </body>
        </html>
    `);
});

// Server starten
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
