import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  text: boolean = false;
  loginForm : FormGroup;
  constructor(private loginservice : LoginService){
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }


  showPassword(){
    this.text = !this.text;
  }

  login(){
   let auth  = {"username":this.loginForm.controls['username'].value, 
    "password": this.loginForm.controls['password'].value}
    this.loginservice.login(auth)
    this.loginForm.reset();
  }

}
