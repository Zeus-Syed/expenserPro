import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private url = 'http://localhost:3000';
private socket;
  constructor() {
    this.socket = io(this.url);
   }

   public verifyUser = () =>{
return Observable.create((observer)=>{
     this.socket.on('verifyUser', (data) =>{
      observer.next(data);
     });
    });
   }

   public setUser = (authToken) => {
    this.socket.emit("set-user", authToken);
  }

  public onlineUserList = () => {
    return Observable.create((observer) => {
      this.socket.on('online-user-list', (userList) => {
        observer.next(userList);
      });
    });
}

}
