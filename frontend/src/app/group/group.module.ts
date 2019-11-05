import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupViewComponent } from './group-view/group-view.component';
import { ToastrModule } from 'ng6-toastr-notifications';
import { RouterModule } from '@angular/router';
import { GroupServiceService } from './group-service.service';
import { GroupCreateComponent } from './group-create/group-create.component';
import { GroupUsersComponent } from './group-users/group-users.component';
import { FormsModule } from '@angular/forms';
import { GroupExpenseComponent } from './group-expense/group-expense.component';
import { GroupExpenseViewComponent } from './group-expense-view/group-expense-view.component';
import { ExpenseHistoryComponent } from './expense-history/expense-history.component';
import { GroupRouteGuardService } from './group-route-guard.service';
import { SocketService } from '../socket.service';




@NgModule({
  declarations: [GroupViewComponent, GroupCreateComponent, GroupUsersComponent, GroupExpenseComponent, GroupExpenseViewComponent, ExpenseHistoryComponent],
  imports: [
    CommonModule,
    FormsModule,
    ToastrModule.forRoot(),
    RouterModule.forChild([
      {path: 'group', component: GroupViewComponent, canActivate:[GroupRouteGuardService]},
      {path: 'gcreate', component: GroupCreateComponent, canActivate:[GroupRouteGuardService]},
      {path: 'gusers', component: GroupUsersComponent, canActivate:[GroupRouteGuardService]},
      {path: 'gsingle/:groupId', component: GroupExpenseComponent, canActivate:[GroupRouteGuardService]},
      {path: 'esingle/:expId', component: GroupExpenseViewComponent, canActivate:[GroupRouteGuardService]},
      {path: 'history', component: ExpenseHistoryComponent, canActivate:[GroupRouteGuardService]}
    ])
  ],
  providers: [GroupServiceService, SocketService]
})
export class GroupModule { }
