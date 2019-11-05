import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  public email;
  public password;
  public cpassword;
  constructor(public toastr: ToastrManager, public userService: UserService, public router:Router) { }

  ngOnInit() {
  }
  public submitDetails = () => {
    console.log("details clicked!!!");

    if (!this.email) {
      this.toastr.warningToastr("Enter email");
    }
    else if (!this.password) {
      this.toastr.warningToastr("Enter password");
    }
    else if (!this.cpassword) {
      this.toastr.warningToastr("Enter confirm password");
    }
    else if(this.email != this.cpassword){
      this.toastr.warningToastr("Password not matching!!");
    }
    else{

      this.userService.getSingleUserByEmail(this.email).subscribe(
        (data)=>{
           if(data.status == 200){
            let data = {
              email: this.email,
              password: this.password
            }
    
          this.userService.resetPassword(data).subscribe(
            (data) => {
              if(data.status == 200){
               this.toastr.successToastr("Password reset successfully!!");
               console.log(data);
    
               this.router.navigate(['/']);
              }
            },
            (err) => {
      console.log(err.message);
            }
          )
           }
           else{
            this.toastr.warningToastr("No user found");
           }
        },
        (err)=>{
         console.log(err.message);
        }
      )

        


    }

  }

}
