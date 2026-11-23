const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const publicDirectory = path.join(__dirname, 'public');
const files = {
  '/': ['index.html', 'text/html; charset=utf-8'],
  '/index.html': ['index.html', 'text/html; charset=utf-8'],
  '/styles.css': ['styles.css', 'text/css; charset=utf-8'],
  '/app.js': ['app.js', 'text/javascript; charset=utf-8'],
};

const server = http.createServer((request, response) => {
  const file = files[new URL(request.url, 'http://localhost').pathname];

  if (!file) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Não encontrado');
    return;
  }

  fs.readFile(path.join(publicDirectory, file[0]), (error, contents) => {
    if (error) {
      response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Não foi possível carregar a página');
      console.error(`Erro ao ler ${file[0]}:`, error);
      return;
    }

    response.writeHead(200, { 'Content-Type': file[1] });
    response.end(contents);
  });
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Formulário disponível em http://localhost:3000');
});
