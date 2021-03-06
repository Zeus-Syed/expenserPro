import { Component, OnInit } from '@angular/core';
import { GroupServiceService } from '../group-service.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-expense-history',
  templateUrl: './expense-history.component.html',
  styleUrls: ['./expense-history.component.css']
})
export class ExpenseHistoryComponent implements OnInit {
public history:any = [];
public pageValue:number = 0;
public authToken;
  constructor(public groupService: GroupServiceService, public toastr: ToastrManager) { }

  ngOnInit() {
    this.authToken = Cookie.get('authToken');
    this.HistoryDisplay();
  }

  public HistoryDisplay=()=>{

    let previousData = (this.history.length > 0 ? this.history.slice() : [] );
    this.groupService.getAllHistory(this.pageValue * 10, this.authToken).subscribe(
      (data)=>{
        if(data['status'] == 200){
  this.history = data['data'].concat(previousData);
  console.log(this.history);
        }
        else{
          this.history = previousData;
          this.toastr.warningToastr('NO more History available');
        }
      },
      (err)=>{
              console.log(err.message);
      }
    )
  }

  public viewMore = ()=>{
  this.pageValue++;
//let previousData = (this.history.length > 0 ? this.history.splice() : [] );
this.HistoryDisplay();

}

}
