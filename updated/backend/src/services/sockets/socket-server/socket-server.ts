import http, { Server } from 'http';
import io from 'socket.io';
// import RedisAdapter from 'socket.io-redis';
import { config, getHostDomain } from '../../../config/environment';


export class SocketServer {

  public io!: io.Server;

  constructor() {
  }

  /**
   * Start the Socket Server.
   *
   * @param {http.Server} server
   */
  public async start(server: http.Server) {
    try {
      /**
       * 
       * "redis adapter is based on pub/sub mecanism and should not 
       *  be scaled using redis cluster and is (as such) useless as 
       *  soon as message rate exceed ~100k/s"
       * 
       */

      // // create redis adapter for sockets.io
      // const redisAdapter = RedisAdapter({
      //   host: config.redis.host,
      //   port: Number(config.redis.port),
      //   auth_pass: config.redis.password
      // });

      // create socket io server
      this.io = new io.Server(server, { path: "", cors: { origin: "*" } });
      this.io.on("connection", (socket) => {
        console.log("New PDA has connected");
        //emit welcome message from server to user
        socket.emit("welcome", {
          message: "connection was successful",
        });
      });
      // implement socket initialization with path provided by config

      // attach redis adapter
      // this.io.adapter(redisAdapter);

      // // log adapter errors
      // this.io
      //   .of('/').adapter
      //   .on('error', (e: Error) => {
      //     console.error('Socket server failed due to: ', e);
      //   });

      // register events on connect
      this.onConnect();

      console.info(`Sockets are established on path: ${getHostDomain()}${config.sockets.path}`);

    } catch (e) {
      console.error('Socket server failed to start', e);
    }
  }

  //#region Private methods

  /**
   * On server connection.
   */
  private onConnect() {
    this.io.on('connection', socket => {
      console.debug('connection');

      this.onSubscribe(socket);
      this.onUnsubscribe(socket);
      this.onDisconnecting(socket);
      this.onClientEvent(socket);
    });
  }

  /**
   * On subscribe to a channel.
   *
   * @param {io.Socket} socket
   */
  private onSubscribe(socket: io.Socket): void {
    socket.on('subscribe', (data: any) => {
      console.debug('subscribe');
    });
  }

  /**
   * On unsubscribe from a channel.
   *
   * @param {io.Socket} socket
   */
  private onUnsubscribe(socket: io.Socket): void {
    socket.on('unsubscribe', (data: any) => {
      console.debug('unsubscribe');
    });
  }

  /**
   * On socket disconnecting.
   *
   * @param {io.Socket} socket
   */
  private onDisconnecting(socket: io.Socket): void {
    socket.on('disconnecting', (reason: any) => {
      console.debug('disconnecting');
    });
  }

  /**
   * On client events.
   *
   * @param {io.Socket} socket
   */
  private onClientEvent(socket: io.Socket): void {
    socket.on('client:event', (data: any) => {
      console.debug('client event');
    });
  }

  //#endregion Private methods
  // --------------------------------

}

