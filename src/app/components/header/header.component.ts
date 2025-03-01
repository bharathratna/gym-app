import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  admin: boolean = false;
  isLogin: boolean = false;
  constructor(private loginservice: LoginService, private router: Router){
    if(localStorage.getItem('role') === 'admin'){
      this.admin = true;
    } 
   console.log( localStorage.getItem('name') !== null)
    if(localStorage.getItem('name') !== null){
      this.isLogin = true;
    } 
  }

  logout(){
    this.loginservice.logOut();
    this.router.navigate(['/'])
    if(localStorage.getItem('role') === null){
      this.admin = false;
    }
    if(localStorage.getItem('name') === null){
      this.isLogin = false;
    } 

  }

}
