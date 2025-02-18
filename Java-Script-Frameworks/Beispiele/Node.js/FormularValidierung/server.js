const express = require('express');
const path = require('path');
const { body, validationResult } = require('express-validator');
const bodyParser = require('body-parser');

const app = express();

// Middleware für statische Dateien (CSS, HTML)
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware für das Verarbeiten von Formularen
app.use(bodyParser.urlencoded({ extended: true }));

// Route für GET-Anfragen (zeigt das Formular an)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/html/index.html'));
});

// Route für POST-Anfragen mit Validierung
app.post('/', [
    body('firstname').notEmpty().withMessage('Vorname darf nicht leer sein')
                     .isAlpha().withMessage('Vorname darf nur Buchstaben enthalten'),
    body('lastname').notEmpty().withMessage('Nachname darf nicht leer sein')
                    .isAlpha().withMessage('Nachname darf nur Buchstaben enthalten'),
    body('email').isEmail().withMessage('Ungültige E-Mail-Adresse'),
    body('phone').optional().isMobilePhone().withMessage('Ungültige Telefonnummer'),
    body('message').notEmpty().withMessage('Nachricht darf nicht leer sein')
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send(`
            <html>
            <head><title>Fehler bei der Eingabe</title></head>
            <body>
                <h1>Formulareingabefehler</h1>
                <ul>
                    ${errors.array().map(error => `<li>${error.msg}</li>`).join('')}
                </ul>
                <a href="/">Zurück zum Formular</a>
            </body>
            </html>
        `);
    }

    const formData = req.body;
    res.send(`
        <html>
        <head><title>Formularergebnisse</title></head>
        <body>
            <h1>Formular Eingaben</h1>
            <p>Vorname: ${formData.firstname}</p>
            <p>Nachname: ${formData.lastname}</p>
            <p>E-Mail: ${formData.email}</p>
            <p>Telefonnummer: ${formData.phone || 'Keine Telefonnummer angegeben'}</p>
            <p>Nachricht: ${formData.message}</p>
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
