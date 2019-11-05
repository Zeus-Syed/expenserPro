import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { GroupServiceService } from '../group-service.service';
import { Location } from '@angular/common';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.css']
})
export class GroupCreateComponent implements OnInit {

public newGroupName;
public sendList;
public authToken;
 public usersList:Array<object> =[];
  constructor(public toastr: ToastrManager, public router: Router, 
    public groupService: GroupServiceService, public location: Location) { }

  ngOnInit() {
  }

  receiveList($event){
this.usersList = $event;
console.log(this.usersList);
  }

  public goToGusers:any = () =>{
    this.router.navigate(['/gusers']);
  }
  public goToGroupView = () =>{
    this.router.navigate(['/group']);
  }
  public goBack=() =>{
    this.location.back();
  }

  public createGroup = () =>{

    if(!this.newGroupName){
this.toastr.warningToastr("ENTER GROUP NAME!!!")
    }
    else if(this.usersList.length<= 1){
      this.toastr.warningToastr("Select Users and PRESS 'CONFIRM'!!");
    }

    else{
      
    let data = {
      groupName: this.newGroupName,
      usersList: this.usersList
    }
  console.log(data);
      this.authToken = Cookie.get('authToken');
    this.groupService.createGroup(data).subscribe(
      (data)=>{
            if(data.status == 200){
              console.log(data);
              this.toastr.successToastr("Group created succesfully");
              let temp = JSON.parse(data.data.userList)
              console.log(temp);

              setTimeout(()=>{
              this.goToGroupView();
              }, 1000);
            }
      },
      (err)=>{
           this.toastr.errorToastr("Problem in group creation");
           console.log(err.message);
      }
    )

  }
  }

}
