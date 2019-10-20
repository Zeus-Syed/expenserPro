import { Component, OnInit } from '@angular/core';
import { ToastrModule } from 'ng6-toastr-notifications';
import { GroupServiceService } from '../group-service.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';


@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.css']
})
export class GroupViewComponent implements OnInit {
    //public groupName;
    public emptyArray =  [];
    public temp;
public groupsArray;
  constructor(public toastr: ToastrModule,
     public groupService: GroupServiceService,
      public router: Router, public userService: UserService) { }

  ngOnInit() {
     
     this.groupService.getAllGroups().subscribe(
      (data)=>{
         this.groupsArray = data['data']; 
         console.log(this.groupsArray);
         //this.temp = this.groupsArray.toObject();
         //let temp = this.groupsArray.userList;
         //console.log(temp);
        // this.groupsArray = JSON.parse(this.groupsArray.userList);
        //for(let x of this.groupsArray){
         // this.emptyArray = JSON.parse(x.userList);
        //}


      },
      (err)=>{
       console.log("some error");
      }
    )

  }

  public goToCreateGroup =()=>{
this.router.navigate(['/gcreate']);
  }





}
