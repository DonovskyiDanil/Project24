const http = require('http');
const express = require('express');
const cors = require('cors');

const router = require('./router');
const controller = require('./socketInit');
const handlerError = require('./handlerError/handler');

const PORT = process.env.PORT || 5001;
const app = express();

// Настройка CORS для всех источников
app.use(cors({
  origin: '*', // Разрешаем все источники
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
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
