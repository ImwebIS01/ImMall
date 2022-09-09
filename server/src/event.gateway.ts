import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server } from 'ws';

@WebSocketGateway(8080)
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  onEvent(client: any, data: any) {
    return { event: 'events', data: 'test' };
  }
}
