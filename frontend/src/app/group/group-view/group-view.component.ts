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
  public userInfo;
  public emptyArray = [];
  public temp;
  public temp2;
  public groupsArray;
  public tempGroupsArray;
  constructor(public toastr: ToastrModule,
    public groupService: GroupServiceService,
    public router: Router, public userService: UserService) { }

  ngOnInit() {
    this.userInfo = this.userService.getUserInfoFromLocalStorage();
    this.groupService.getAllGroups().subscribe(
      (data) => {
        this.tempGroupsArray = data['data'];
        console.log(this.tempGroupsArray);

        for (let x of this.tempGroupsArray) {
          var flag;
          this.temp = Object.values(x);

          this.temp2 = JSON.parse(this.temp[0]);


          flag = 0;
          for (let y of this.temp2) {

            if (y.userId == this.userInfo.userId) {
              flag = 1;
              console.log(flag);
            }
          }

          if (flag == 0) {
            this.tempGroupsArray.splice(x, 1);
          }

        }


      },
      (err) => {
        console.log("some error");
      }
    )

  }

  public goToCreateGroup = () => {
    this.router.navigate(['/gcreate']);
  }





}
