import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequest } from '../model/AuthRequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = "http://localhost:8082/auth/generateToken"

  constructor(private httpClient: HttpClient) { }

  login(auth: AuthRequest){
    this.httpClient.post<{token: string}>(this.baseUrl, auth).subscribe( res => {
      localStorage.setItem('jwtToken', res.token)
    })
  }

  logOut(){
   localStorage.removeItem('jwtToken') 
  }
}
