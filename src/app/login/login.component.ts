import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: AuthService, private router: Router) {
    sessionStorage.clear();
  }

  userData:any;

  loginForm=this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  })

  completeLogin() {
    this.service.GetById(this.loginForm.value.username).subscribe(result => {
      this.userData = result;
      console.log(this.userData);
      if(this.userData.password === this.loginForm.value.password){
        if(this.userData.isActive){
          sessionStorage.setItem('username', this.userData.id);
          sessionStorage.setItem('userrole', this.userData.role);
          this.router.navigate([''])
        }else{
          this.toastr.error('Inactive account. Please contact administrator')
        }
      }else{
        this.toastr.error('Invalid Username or Password!')
      }
    })

  }
}


