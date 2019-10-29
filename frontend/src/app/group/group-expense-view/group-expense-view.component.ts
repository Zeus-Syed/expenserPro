import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { GroupServiceService } from '../group-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Location } from '@angular/common';

@Component({
  selector: 'app-group-expense-view',
  templateUrl: './group-expense-view.component.html',
  styleUrls: ['./group-expense-view.component.css']
})
export class GroupExpenseViewComponent implements OnInit {

public expense;
public userNames = [];
public groupId;
public temp;
public userArray;
public usersList;
public mean;
public mean1;
public newAmount;
public newExpenseName;
public payerName;
  constructor(public toastr:ToastrManager, public groupService: GroupServiceService, 
    public router: Router, public _route: ActivatedRoute, public location: Location) { }

  ngOnInit() {
   

    let expId = this._route.snapshot.paramMap.get('expId');

//this.userNames = this.groupService.getUserNames();

this.groupService.getSingleExpense(expId).subscribe(
  (data)=>{
   this.expense = data['data'];
   console.log(this.expense);
      this.groupId = this.expense.groupId;
      console.log(this.groupId);
      this.newAmount = this.expense.amount;
      this.newExpenseName = this.expense.expName;


      ////get userNames from group
      this.groupService.getSingleGroup(this.groupId).subscribe(
        (data) => {
          this.temp = data['data'];
          console.log(this.temp);
          this.userArray = Object.values(this.temp);
          this.usersList = JSON.parse(this.userArray[0]); // usersList
        console.log(this.usersList);
        for (let x of this.usersList) {
          
          this.userNames.push(x.firstName);
        }
        console.log(this.userNames);
        console.log(this.expense.amount);
      console.log(this.userNames.length);
      this.mean = this.expense.amount / this.userNames.length;
      this.mean1 = this.mean.toFixed(2);
      console.log(this.mean1);
        }
      )
      
      ////
  },
  (err)=>{
console.log(err.message);
  }
)
}

public deleteExpense =()=>{
  console.log("deletion!!");
  let expId = this._route.snapshot.paramMap.get('expId');
  console.log(expId);
  this.groupService.deleteExpense(expId).subscribe(
    (data)=>{
       
               this.toastr.successToastr("Expense deleted Successfully!!");

               this.location.back();
         
    },
    (err)=>{
        console.log(err.message);
    }
  )
}

public editExpense = ()=>{
  let expId = this._route.snapshot.paramMap.get('expId');
  console.log(this.payerName);
  //let payerdetails = Object.assign(this.payerName);
  let pName = this.payerName.firstName;
  let payerId = this.payerName.userId;

  let data = {
    expName: this.newExpenseName,
    amount: this.newAmount,
    payerName: pName,
    payerId: payerId
  }

  $('.modal').removeClass('in');
  $('.modal').attr("aria-hidden", "true");
  $('.modal').css("display", "none");
  $('.modal-backdrop').remove();
  $('body').removeClass('modal-open');

  this.groupService.editExpense(expId, data).subscribe(
    (data)=>{
   this.toastr.successToastr("Expense Edited Successfully!!!");
      this.location.back();

    },
    (err)=>{
console.log(err.message);
    }
  )

}

public goBack=()=>{
  this.location.back();
}

}
