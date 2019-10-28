import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupServiceService } from '../group-service.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UserService } from 'src/app/user.service';
//import $ from "jquery";

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
  public newExpenseName;
  public newAmount;
  public userNames = [];
  public payerName: Object;
  public temp1;
  public expenses;
  constructor(public _route: ActivatedRoute, public groupService: GroupServiceService,
    public route: Router, public toastr: ToastrManager, public userService: UserService) { }

  ngOnInit() {

    //this.temp1 = this.userService.getUserInfoFromLocalStorage();
    //this.payerName = this.temp1.firstName;
    let groupId = this._route.snapshot.paramMap.get('groupId');
    console.log(groupId);

    this.groupService.getSingleGroup(groupId).subscribe(
      (data) => {
        this.temp = data['data'];
        console.log(this.temp);

        this.groupSingle = Object.entries(this.temp).map((e) => ({ [e[0]]: e[1] }));
        console.log(this.groupSingle);
        //console.log(this.groupSingle[0][0]);

        this.userArray = Object.values(this.temp);
        console.log(this.userArray);
        console.log(this.userArray[0]);
        console.log(typeof (this.userArray[0]));
        this.usersList = JSON.parse(this.userArray[0]); // usersList
        console.log(this.usersList);
        for (let x of this.usersList) {
          this.userNames.push(x.firstName);
        }
        console.log(this.userNames);
      },
      (err) => {
        console.log(err.message);
      }
    )

    this.getAllExpenses();

  }  // ngOnit




  public createExpense = () => {

    let groupId = this._route.snapshot.paramMap.get('groupId');
    console.log(this.payerName);
    //let payerdetails = Object.assign(this.payerName);
    let pName = this.payerName.firstName;
    let payerId = this.payerName.userId;

    let data = {
      groupId: groupId,
      expName: this.newExpenseName,
      amount: this.newAmount,
      payerName: pName,
      payerId: payerId
    }
    console.log(data);
    //this.route.navigate(['/gsingle']);
    $('.modal').removeClass('in');
    $('.modal').attr("aria-hidden", "true");
    $('.modal').css("display", "none");
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');


    this.groupService.createExpense(data).subscribe(
      (data) => {
        if (data.status == 200) {
          this.toastr.successToastr("Expense created successfully!!");
          this.getAllExpenses();


        }



      },
      (err) => {
        this.toastr.errorToastr("Some error occured!!!");
        console.log(err.message);
      }
    )

  }

  public getAllExpenses = () => {

    let groupId = this._route.snapshot.paramMap.get('groupId');

    this.groupService.getAllExpenses(groupId).subscribe(
      (data) => {
        if (data['data'] != null) {
          this.expenses = data['data'];
          console.log(this.expenses);

          //
          let temp = Object.assign({}, this.userNames);
          function swap(result) {
            var ret = {};
            for (var key in result) {
              ret[result[key]] = key;
            }
            return ret;
          }
          let res = swap(temp);
          for (let z of this.userNames) {
            res[z] = 0;
          }
          console.log(res);
          //   res = {user:0(amountPaid)}


          for (let x of this.userNames) {
            let total = 0;
            for (let y of this.expenses) {
              if (x == y.payerName) {
                total = total + y.amount;
              }
            }
            res[x] = total;

          }
          console.log(res);
          this.amountPending(res);
        }
      },
      (err) => {
        this.toastr.errorToastr('Some error occurred!!!');
        console.log(err.message);
      }
    )

  }



  public deleteGroup = () => {
    let groupId = this._route.snapshot.paramMap.get('groupId');

    this.groupService.deleteGroup(groupId).subscribe(
      (data) => {
        this.toastr.successToastr("DELETED SUCCESSFULLY!!");
        this.route.navigate(['/group']);
      },
      (err) => {
        console.log(err.message);
      }
    )

  }

  public amountPending = (res) => {
    const users = Object.keys(res);
    const amountPaid = Object.values(res);
    const sum = amountPaid.reduce((acc, curr) => curr + acc);
    const mean = sum / users.length;
    const sortedPeople = users.sort((personA, personB) => res[personA] - res[personB]);
    const sortedValuesPaid = sortedPeople.map((person) => res[person] - mean);

    let i = 0;
    let j = sortedPeople.length - 1;
    let debt;

    while (i < j) {
      debt = Math.min(-(sortedValuesPaid[i]), sortedValuesPaid[j]);
      sortedValuesPaid[i] += debt;
      sortedValuesPaid[j] -= debt;
  
      console.log(`${sortedPeople[i]} owes ${sortedPeople[j]} Rs:${debt}`);
  
      if (sortedValuesPaid[i] === 0) {
        i++;
      }
  
      if (sortedValuesPaid[j] === 0) {
        j--;
      }
    }
  }

}
