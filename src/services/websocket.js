import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const SOCKET_URL = 'http://localhost:8080/ws';

class WebSocketService {
  constructor() {
    this.client = new Client({
      brokerURL: SOCKET_URL,
      connectHeaders: {},
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      webSocketFactory: () => new SockJS(SOCKET_URL),
    });
  }

  connect(onConnect) {
    this.client.onConnect = onConnect;
    this.client.activate();
  }

  subscribe(topic, callback) {
    this.client.subscribe(topic, (message) => {
      callback(JSON.parse(message.body));
    });
  }

  disconnect() {
    this.client.deactivate();
  }
}

const webSocketService = new WebSocketService();
export default webSocketService;
