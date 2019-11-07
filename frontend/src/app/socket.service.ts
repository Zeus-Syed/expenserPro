import { Injectable, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Location } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private url = 'http://api.zeussyed.xyz';
private socket;
public authToken;

  constructor(public toastr: ToastrManager) {
    this.socket = io(this.url,{
     'forceNew': true
    });
    this.authToken = Cookie.get('authToken');
   //this.verifyUser();
  // this.onlineUserList();
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

   /*public verifyUser = () =>{
     this.socket.on('verifyUser', (data)=>{
       this.setUser();
       this.onlineUserList();
     })
   }*/

   public setUser = (authToken) => {
    this.socket.emit("set-user", authToken);
  }

  /*public onlineUserList = ()=>{
    this.socket.on('online-user-list', (userList)=>{
      console.log(userList)
    });
  }*/

  public onlineUserList = () => {
    return Observable.create((observer) => {
      this.socket.on('online-user-list', (userList) => {
        observer.next(userList);
      });
    });
}

public exitSocket = () =>{

  this.socket.disconnect();
  console.log('socket disconnected');
  location.reload();
  
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
