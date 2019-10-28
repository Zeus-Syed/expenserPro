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
  public groupsArray:Array<object>=[];
  public tempGroupsArray;
  constructor(public toastr: ToastrModule,
    public groupService: GroupServiceService,
    public router: Router, public userService: UserService) { }

  ngOnInit() {
    this.userInfo = this.userService.getUserInfoFromLocalStorage();
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

  }

  public goToCreateGroup = () => {
    this.router.navigate(['/gcreate']);
  }





}
