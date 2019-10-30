import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupExpenseViewComponent } from './group-expense-view.component';

describe('GroupExpenseViewComponent', () => {
  let component: GroupExpenseViewComponent;
  let fixture: ComponentFixture<GroupExpenseViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupExpenseViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupExpenseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
