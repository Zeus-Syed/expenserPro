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
public usersArray;
  constructor(public toastr: ToastrModule,
     public groupservice: GroupServiceService,
      public router: Router, public userService: UserService) { }

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



}
