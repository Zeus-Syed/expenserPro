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




@NgModule({
  declarations: [GroupViewComponent, GroupCreateComponent, GroupUsersComponent, GroupExpenseComponent, GroupExpenseViewComponent, ExpenseHistoryComponent],
  imports: [
    CommonModule,
    FormsModule,
    ToastrModule.forRoot(),
    RouterModule.forChild([
      {path: 'group', component: GroupViewComponent},
      {path: 'gcreate', component: GroupCreateComponent},
      {path: 'gusers', component: GroupUsersComponent},
      {path: 'gsingle/:groupId', component: GroupExpenseComponent},
      {path: 'esingle/:expId', component: GroupExpenseViewComponent},
      {path: 'history', component: ExpenseHistoryComponent}
    ])
  ],
  providers: [GroupServiceService]
})
export class GroupModule { }
