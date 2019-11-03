import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupServiceService } from '../group-service.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UserService } from 'src/app/user.service';
import { Location } from '@angular/common';
import { SocketService } from 'src/app/socket.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-group-expense',
  templateUrl: './group-expense.component.html',
  styleUrls: ['./group-expense.component.css']
})
export class GroupExpenseComponent implements OnInit {
  public history;
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
  public pendingDetails:Array<Object> = [];
  public emails = [];
  public emails1;
  public temp2;
  public authToken;
  constructor(public _route: ActivatedRoute, public groupService: GroupServiceService,
    public route: Router, public toastr: ToastrManager, public userService: UserService,
     public location: Location, public socketService: SocketService) { }

  ngOnInit() {
     this.authToken = Cookie.get('authToken');
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
  

        this.userArray = Object.values(this.temp);
        console.log(this.userArray);
        console.log(this.userArray[0]);
        console.log(typeof (this.userArray[0]));
        this.usersList = JSON.parse(this.userArray[0]); // usersList
        console.log(this.usersList);
        for (let x of this.usersList) {
          this.userNames.push(x.firstName);
          this.userService.getSingleUser(x.userId).subscribe(
            (data)=>{
              let y = data.data.email;
              this.emails.push(y);
            }
          )
        }
        console.log(this.emails);
        console.log(this.userNames);
      },
      (err) => {
        console.log(err.message);
      }
    )

    this.getAllExpenses();
    //this.historyDetails();

  }  // ngOnit

  /*public historyDetails =()=>{
    this.socketService.historyDetails().subscribe(
      (message)=>{
      // console.log(message);
        this.toastr.successToastr(message);
      },
      (err)=>{
        console.log(err);
      }
    )
  }*/




  public createExpense = () => {

    let groupId = this._route.snapshot.paramMap.get('groupId');
    let temp = this.userService.getUserInfoFromLocalStorage();
    let expAdder = temp.firstName;
    console.log(this.payerName);
    //let payerdetails = Object.assign(this.payerName);
    let pName = this.payerName['firstName'];
    let payerId = this.payerName['userId'];

    let data = {
      groupId: groupId,
      expName: this.newExpenseName,
      amount: this.newAmount,
      payerName: pName,
      payerId: payerId,
      expAdder: expAdder
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
  this.history = data['data'];
console.log(this.history);
  
      let history = `${expAdder} added ${this.newExpenseName} in ${this.temp.groupName}`;
      
      this.socketService.expenseHistory(history);

      //let temp = Object.assign({}, this.emails);
       // temp['message'] = history;
       // console.log(temp);
       this.emails1 = this.emails.join();

       let mail = {
        from: 'nadeemcool47@gmail.com',
        to: `${this.emails1}`,
        subject: 'Expense Addition',
        text: `${history}`
       }
       console.log(mail);

       this.userService.sendMail(mail).subscribe(
         (data)=>{
           console.log(data);
         }
       )



      let historyDetails = {
        details: history,
        createdOn: this.history.createdOn
      }
this.groupService.createHistory(historyDetails).subscribe(
  (data)=>{
    this.toastr.successToastr("History updated!!");
  }
)
  
  this.getAllExpenses();
        
        }



      },
      (err) => {
        this.toastr.errorToastr("Some error occured!!!");
        console.log(err.message);
      }
    )

  }

  public sendNames=()=>{
    this.groupService.setUserNames(this.userNames);
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
          console.log(temp);
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

    this.groupService.deleteGroup(groupId, this.authToken).subscribe(
      (data) => {
        this.toastr.successToastr("DELETED SUCCESSFULLY!!");
        this.route.navigate(['/group']);
      },
      (err) => {
        console.log(err.message);
      }
    )

  }

  public goBack = () =>{
    this.location.back();
  }

  public amountPending = (res) => {
    
    const users = Object.keys(res);
    const amountPaid = Object.values(res);
    const sum:any = amountPaid.reduce((acc:number, curr:number) => curr + acc, 0);
    const mean = sum / users.length;
    const sortedPeople = users.sort((personA, personB) => res[personA] - res[personB]);
    const sortedValuesPaid = sortedPeople.map((person) => res[person] - mean);

    let i = 0;
    let j = sortedPeople.length - 1;
    let debt;
    this.pendingDetails = [];
    while (i < j) {
      debt = Math.min(-(sortedValuesPaid[i]), sortedValuesPaid[j]);
      sortedValuesPaid[i] += debt;
      sortedValuesPaid[j] -= debt;
  
      console.log(`${sortedPeople[i]} owes ${sortedPeople[j]} Rs:${debt}`);

         let data ={
           payer: sortedPeople[i],
           receiver: sortedPeople[j],
           debt: debt.toFixed(2)
         }
         this.pendingDetails.push(data);
         console.log(this.pendingDetails);
  
      if (sortedValuesPaid[i] === 0) {
        i++;
      }
  
      if (sortedValuesPaid[j] === 0) {
        j--;
      }
    }
  }

}
