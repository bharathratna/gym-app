import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,  } from '@angular/router';
import { LoggedUser } from 'src/app/model/LoggedUser';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  text: boolean = false;
  loginForm : FormGroup;
  constructor(private loginservice : LoginService, private router: Router){
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
    this.loginservice.login(auth).subscribe(res => {
      this.setNameAndRole(res)
      location.reload()
    
  })
    this.loginForm.reset();
    this.router.navigate(["/"])
  }
  
  setNameAndRole(loggedInUser : LoggedUser){
    localStorage.setItem("role", loggedInUser.role)
    localStorage.setItem("name", loggedInUser.username)
    localStorage.setItem("id", loggedInUser.id.toString())
  }
   
}
