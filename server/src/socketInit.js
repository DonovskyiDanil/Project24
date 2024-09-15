const { Server } = require('socket.io');
const ChatController = require('./controllers/sockets/ChatController');
const NotificationController = require('./controllers/sockets/NotificationController');

let notificationController;
let chatController;

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:5001'],
  methods: ['GET', 'POST'],
  credentials: true,
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
