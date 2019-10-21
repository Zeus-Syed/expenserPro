import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';
import {Cookie} from 'ng2-cookies';

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
  constructor(public toastr: ToastrManager, public userService: UserService,public router: Router) { }


 

  ngOnInit() {

   

    this.usersArray = this.userService.getAllUsers().subscribe(
      (data)=>{
         this.usersArray = data['data'];
      },
      (err)=>{
       console.log("some error");
      }
    )

  }

@Output() listEvent = new EventEmitter();
  public sendUsersList = () =>{

    this.localInfo = this.userService.getUserInfoFromLocalStorage();

    let defaultRecord = {
      userId: this.localInfo.userId,
    firstName: this.localInfo.firstName
  }
  this.recordsArray.push(defaultRecord);

if(this.recordsArray.length <= 1){
  this.toastr.warningToastr("No Users Selected!!!");
}

this.listEvent.emit(this.recordsArray);

//this.router.navigate(['/gcreate']);
  }

  public storeUsers =(userId, firstName)=>{


    /*if(localStorage.getItem('records') == null){
      var locaArray = [];
    }
    else{
      locaArray = JSON.parse(localStorage.getItem('records'));
    }*/
    
  let record = {
    userId: userId,
    firstName: firstName
  }
  //locaArray.push(record);
  //localStorage.setItem('records', JSON.stringify(locaArray));

  //this.localArray = JSON.parse(localStorage.getItem('records'));

  this.recordsArray.push(record);
  console.log(this.recordsArray);
  }

  public removeRecords=(record)=>{



this.recordsArray.splice(record,1);
console.log(this.recordsArray);
  }

}
