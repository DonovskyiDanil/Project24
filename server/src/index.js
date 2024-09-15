const http = require('http');
const express = require('express');
const cors = require('cors');

const router = require('./router');
const controller = require('./socketInit');
const handlerError = require('./handlerError/handler');

const PORT = process.env.PORT || 4000;
const app = express();

// Настройка CORS для разрешения запросов с двух портов: 3000 и 5000
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:5001'],
  credentials: true, // Разрешаем передачу куков, если нужно
}));

app.use(express.json());
app.use('/public', express.static('public'));
app.use(router);
app.use(handlerError);

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

controller.createConnection(server);

const runSeeders = require('./jsonDB/seeders');
const { client } = require('./jsonDB');
runSeeders(client);
