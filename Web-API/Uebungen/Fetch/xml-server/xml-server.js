const express = require('express');
const path = require('path');
const cors = require('cors'); // CORS-Modul importieren
const app = express();
const PORT = 8080;

// CORS für alle Routen aktivieren
app.use(cors());

// Route zum Bereitstellen der XML-Datei
app.get('/note.xml', (req, res) => {
  const xmlPath = path.join(__dirname, 'note.xml');
  res.sendFile(xmlPath);
});

// Starte den Server
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
