import { Component, OnInit } from '@angular/core';
import { ToastrModule } from 'ng6-toastr-notifications';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-users',
  templateUrl: './group-users.component.html',
  styleUrls: ['./group-users.component.css']
})
export class GroupUsersComponent implements OnInit {
public usersArray;
  constructor(public toastr: ToastrModule, public userService: UserService,public router: Router) { }

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
