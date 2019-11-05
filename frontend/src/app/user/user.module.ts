import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ng6-toastr-notifications';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';



@NgModule({
  declarations: [SignupComponent, LoginComponent, ForgotPasswordComponent, PasswordResetComponent],
  imports: [
    CommonModule,
    FormsModule,
    ToastrModule.forRoot(),
    RouterModule.forChild([
      {path: 'signup',component:SignupComponent},
      {path: 'forgot',component:ForgotPasswordComponent},
      {path: 'reset',component:PasswordResetComponent}
    ])
  ]
})
export class UserModule { }
