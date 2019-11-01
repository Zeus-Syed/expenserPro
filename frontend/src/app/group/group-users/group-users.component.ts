import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'app-group-users',
  templateUrl: './group-users.component.html',
  styleUrls: ['./group-users.component.css']
})
export class GroupUsersComponent implements OnInit {
  public usersArray;
  public recordsArray: Array<object> = [];
  public localArray: Array<object> = [];
  public activeUserId = Cookie.get('UserId');
  public localInfo;
  constructor(public toastr: ToastrManager, public userService: UserService, public router: Router) { }




  ngOnInit() {



    this.usersArray = this.userService.getAllUsers().subscribe(
      (data) => {
        this.usersArray = data['data'];
      },
      (err) => {
        console.log("some error");
      }
    )




  }

  @Output() listEvent = new EventEmitter();
  public sendUsersList = () => {


    this.localInfo = this.userService.getUserInfoFromLocalStorage();

    let defaultRecord = {
      userId: this.localInfo.userId,
      firstName: this.localInfo.firstName
    }
    console.log(defaultRecord);

   
let flag = 0;
    for (let x of this.recordsArray) {
      if (defaultRecord.userId === x.userId) {
        flag = 1; break;
      }
    }

if(flag==0){
  this.recordsArray.push(defaultRecord);
}
if(flag==1){
 // this.toastr.warningToastr("Click");
}

    if (this.recordsArray.length <= 1) {
      this.toastr.warningToastr("No Users Selected!!!");
    }
    this.listEvent.emit(this.recordsArray); 
  }

  public storeUsers = (userId, firstName) => {
    let record = {
      userId: userId,
      firstName: firstName
    }
    let flag = 0;
    if (this.recordsArray == null) {
      this.recordsArray.push(record);
    }
    else {
      for (let x of this.recordsArray) {
        if (record.userId === x.userId) {
          flag = 1; break;
        }
      }
    }
    if (flag == 0) {
      this.recordsArray.push(record);
    }
    if (flag == 1) {
      this.toastr.warningToastr('User Already selected!!');
    }

    console.log(this.recordsArray);
  }

  public removeRecords = (record) => {

    //this.recordsArray.splice(record, 1);
    this.recordsArray = this.recordsArray.filter((e)=>{
      return e.userId !== record.userId
    })
    console.log(this.recordsArray);
  }

}
