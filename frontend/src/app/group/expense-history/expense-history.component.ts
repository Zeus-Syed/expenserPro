import { Component, OnInit } from '@angular/core';
import { GroupServiceService } from '../group-service.service';

@Component({
  selector: 'app-expense-history',
  templateUrl: './expense-history.component.html',
  styleUrls: ['./expense-history.component.css']
})
export class ExpenseHistoryComponent implements OnInit {
public history;
  constructor(public groupService: GroupServiceService) { }

  ngOnInit() {

    this.groupService.getAllHistory().subscribe(
      (data)=>{
  this.history = data['data'];
  console.log(this.history);
      },
      (err)=>{
              console.log(err.message);
      }
    )
  }

}
