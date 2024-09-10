import isEqual from 'lodash/isEqual';
import WebSocket from './WebSocket';
import CONTANTS from '../../../constants';
import { addMessage, changeBlockStatusInStore } from '../../../actions/actionCreator';

class ChatSocket extends WebSocket {
  anotherSubscribes = () => {
    this.onNewMessage();
    this.onChangeBlockStatus();
  };

  onChangeBlockStatus = () => {
    this.socket.on(CONTANTS.CHANGE_BLOCK_STATUS, (data) => {
      const { message } = data;
      const { messagesPreview } = this.getState().chatStore;

      const updatedMessagesPreview = messagesPreview.map((preview) => {
        if (isEqual(preview.participants, message.participants)) {
          return { ...preview, blackList: message.blackList };
        }
        return preview;
      });

      this.dispatch(changeBlockStatusInStore({ chatData: message, messagesPreview: updatedMessagesPreview }));
    });
  };

  onNewMessage = () => {
    this.socket.on('newMessage', (data) => {
      const { message, preview } = data.message;
      const { messagesPreview } = this.getState().chatStore;


      let updatedMessagesPreview = [...messagesPreview];
      let isNew = true;

      updatedMessagesPreview = updatedMessagesPreview.map((existingPreview) => {
        if (isEqual(existingPreview.participants, message.participants)) {
          isNew = false;
          return {
            ...existingPreview,
            text: message.body,
            sender: message.sender,
            createAt: message.createdAt,
          };
        }
        return existingPreview;
      });

      if (isNew) {
        updatedMessagesPreview.push(preview);
      }

      this.dispatch(addMessage({ message, messagesPreview: updatedMessagesPreview }));
    });
  };

  subscribeChat = (id) => {
    this.socket.emit('subscribeChat', id);
  };

  unsubscribeChat = (id) => {
    this.socket.emit('unsubscribeChat', id);
  };
}

export default ChatSocket;
