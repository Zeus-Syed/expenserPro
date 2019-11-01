import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';
@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private url = 'http://localhost:3000';
private socket;
  constructor(public toastr: ToastrManager) {
    this.socket = io(this.url);
    this.historyDetails();
    console.log('socket-service called');
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

public exitSocket = () =>{

  this.socket.disconnect();
}

/*public historyDetails = ()=>{
  return Observable.create((observer) => {
    this.socket.on('history-details', (message) => {
      //console.log(message);
      observer.next(message);
    });
  });
} */

public expenseHistory = (message) =>{
  //console.log(message);
  this.socket.emit('history',message);
}
public historyDetails = ()=>{
  this.socket.on('history-details',(message)=>{
    console.log('receiving testing');
    console.log(message);
    this.toastr.successToastr(message);
  })
}

}
