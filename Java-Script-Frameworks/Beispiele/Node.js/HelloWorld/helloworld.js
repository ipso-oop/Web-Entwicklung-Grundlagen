const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hallo Welt');
  res.end();
});
server.listen(8000, () => {
  console.log('Server läuft auf Port 8000');
});
