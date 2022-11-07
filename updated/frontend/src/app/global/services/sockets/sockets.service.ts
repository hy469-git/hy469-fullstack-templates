import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SocketsService {

  private hostURl: string;
  private serverEventObserver: Subject<any> = new Subject();

  constructor(private http: HttpClient, private socket: Socket) {
    this.hostURl = environment.host;

    // When a server:event arrives, trigger messageObserver
    this.socket.on("server:event", (socketEvent: any) => {
      this.serverEventObserver.next(socketEvent);
    });
  }

  // Pub/Sub functions supported with sockets.
  public publish(event: string, data: any){ 
    // Inform backend to broadcast socket event
    // Publish event needs to land on server and the server will publish it.
    this.socket.emit("client:event", {event: event, data: data});
  }
  public subscribe(event: string, callback: Function){
    this.socket.on(event, (data: any) => {
      callback(data);
    })
  }

  // Old test function
  public receiveWelcome() {
    return this.socket.fromEvent('welcome');
  }
}
