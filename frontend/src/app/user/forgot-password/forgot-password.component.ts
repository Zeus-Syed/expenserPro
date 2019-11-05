import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Location } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
public email;
public  link ='http://localhost:4200/reset';
  constructor(public userService: UserService, public toastr: ToastrManager, public location: Location) { }

  ngOnInit() {
  }

  public goBack =()=>{
    this.location.back();
  }

  public sendMail =()=>{
this.userService.getSingleUserByEmail(this.email).subscribe(
  (data)=>{
   if(data.status == 200){
     this.toastr.successToastr("Recovery Mail Sent to user!!");

     let mail = {
      from: 'zeussyed97@gmail.com',
      to: `${this.email}`,
      subject: 'Password reset',
      text: 'You have requested to reset your password. To reset password, please click '+this.link
     }

     this.userService.sendMail(mail).subscribe(
       (data)=>{
         console.log(data);
       }
     )
     this.location.back();

   }
   else if(data.status == 404){
   this.toastr.warningToastr('No User Found!!');
   }
  },(err)=>{
    console.log(err.message);
  }
) //
  }

}
