import { Component, OnInit } from '@angular/core';
import { ToastrModule } from 'ng6-toastr-notifications';
import { GroupServiceService } from '../group-service.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { SocketService } from 'src/app/socket.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';



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
  constructor(public toastr: ToastrModule,
    public groupService: GroupServiceService,
    public router: Router, public userService: UserService,
     public socketService: SocketService) { }

  ngOnInit() {
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

  this.socketService.onlineUserList().subscribe(
    (usersList)=>{
      console.log(usersList);
      this.onlineUsers = [];
        this.onlineUsers = usersList;
        console.log(this.onlineUsers);
    }
  )
}

  public goToCreateGroup = () => {
    this.router.navigate(['/gcreate']);
  }





}
