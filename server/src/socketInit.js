const { Server } = require('socket.io');
const ChatController = require('./controllers/sockets/ChatController');
const NotificationController = require('./controllers/sockets/NotificationController');

let notificationController;
let chatController;

const corsOptions = {
  origin: '*', // Разрешаем все источники
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

module.exports.createConnection = (httpServer) => {
  const io = new Server(httpServer, { cors: corsOptions });
  notificationController = new NotificationController();
  notificationController.connect('/notifications', io);
  chatController = new ChatController();
  chatController.connect('/chat', io);
};

module.exports.getChatController = () => {
  return chatController;
};

module.exports.getNotificationController = () => {
  return notificationController;
};
