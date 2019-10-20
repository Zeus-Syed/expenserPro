import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupServiceService } from '../group-service.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-group-expense',
  templateUrl: './group-expense.component.html',
  styleUrls: ['./group-expense.component.css']
})
export class GroupExpenseComponent implements OnInit {
public groupSingle;
public temp;
public userArray;
public usersList;
  constructor(public _route: ActivatedRoute, public groupService: GroupServiceService, public route: Router, public toastr: ToastrManager) { }

  ngOnInit() {
let groupId = this._route.snapshot.paramMap.get('groupId');
console.log(groupId);

this.groupService.getSingleGroup(groupId).subscribe(
  (data)=>{
   this.temp = data['data'];
   console.log(this.temp);

   this.groupSingle = Object.entries(this.temp).map((e)=>( { [e[0]]: e[1] } ));
   console.log(this.groupSingle);
   //console.log(this.groupSingle[0][0]);
    
   this.userArray = Object.values(this.temp);
   console.log(this.userArray);
   console.log(this.userArray[0]);
   console.log(typeof(this.userArray[0]));
   this.usersList = JSON.parse(this.userArray[0]); // usersList
   console.log(this.usersList);
  },
  (err)=>{
  console.log(err.message);
  }
)
  }


  public deleteGroup = () =>{
    let groupId = this._route.snapshot.paramMap.get('groupId');

    this.groupService.deleteGroup(groupId).subscribe(
      (data)=>{
                   this.toastr.successToastr("DELETED SUCCESSFULLY!!");
               this.route.navigate(['/group']);
      },
      (err)=>{
           console.log(err.message);
      }
    )

  }

}
