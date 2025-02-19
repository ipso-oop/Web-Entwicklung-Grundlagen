Readme node.js XML-Server:

- node.js installieren https://nodejs.org/en
- Das Server Verzeichnis erstellen Bsp: xml-server
- Ins Verzeichnis navigieren (cd xml-server)
- Ueber Commandline: 
	- npm init -y
	- npm install node-fetch
	- npm install express
	- npm install cors
- Schauen das, das note.xml im Server Verzeichnis liegt
- Der Server muss folgenden Script (xml-server.js) haben.
	const express = require('express');
	const path = require('path');
	const cors = require('cors'); // CORS-Modul importieren
	const app = express();
	const PORT = 3000;

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


- Den Server starten über CommandLine mit: node xml-server.js

