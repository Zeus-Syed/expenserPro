import { Component, OnInit } from '@angular/core';
import {  ToastrManager } from 'ng6-toastr-notifications';
import { GroupServiceService } from '../group-service.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { SocketService } from 'src/app/socket.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.css'],
})
export class GroupViewComponent implements OnInit {
  public authToken;
  public userInfo;
  public emptyArray = [];
  public temp;
  public temp2;
  public groupsArray:Array<object>=[];
  public tempGroupsArray;
  public onlineUsers = [];
  constructor(public toastr: ToastrManager,
    public groupService: GroupServiceService,
    public router: Router, public userService: UserService,
     public socketService: SocketService, public http: HttpClient) { }

  ngOnInit() {
    console.log('group-view called!!');
    this.userInfo = this.userService.getUserInfoFromLocalStorage();
    this.authToken = Cookie.get('authToken');
   console.log(this.userInfo.userId);
    this.groupService.getAllGroups().subscribe(
      (data) => {
        this.tempGroupsArray = data['data'];
        console.log(this.tempGroupsArray);

        for (let x of this.tempGroupsArray) {
          let flag;
          this.temp = Object.values(x);
        
          this.temp2 = JSON.parse(this.temp[0]);

   //console.log(this.temp2);
          flag = 0;
          for (let y of this.temp2) {

            if (y.userId === this.userInfo.userId) {
              flag = 1;
            }
            
          }
          if(flag == 1){
           this.groupsArray.push(x);
          }
        // console.log(this.groupsArray);
        //  this.tempGroupsArray.splice(x.groupId,1);
//console.log(x);
         
        }


      },
      (err) => {
        console.log("some error");
      }
    )
this.verifyUser();
//this.getOnlineUsersList();
//this.historyDetails();
  }

  public verifyUser =()=>{
this.socketService.verifyUser().subscribe(
  (data)=>{
   this.socketService.setUser(this.authToken);
   this.getOnlineUsersList();
  }
)
  }

public getOnlineUsersList=()=>{
console.log('online users fetching!!!');
  this.socketService.onlineUserList().subscribe(
    (userList)=>{
     
       console.log(userList);
    }
  )
}

/*public historyDetails =()=>{
  this.socketService.historyDetails().subscribe(
    (message)=>{
     console.log(message);
      this.toastr.successToastr(message);
    },
    (err)=>{
      console.log(err);
    }
  )
}*/



  public goToCreateGroup = () => {
    this.router.navigate(['/gcreate']);
  }
 public logOut = ()=>{
   console.log('logged out successfully!!');
      
   this.userService.logOut(this.authToken)
    .subscribe((myResponse) =>{
      if(myResponse.status === 200){
        console.log("logout called");
        Cookie.delete("UserId");
        Cookie.delete('UserName');
        Cookie.delete("authToken");
        this.socketService.exitSocket();
        console.log('log out confirmation');
        this.router.navigate(['/']);
      }
      else{
        console.log(myResponse.message);
      }
    }, (err) =>{
      console.log("someerror Ocuured!!!");
    }
    );
 }
 



}
