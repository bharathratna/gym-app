import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequest } from '../model/AuthRequest';
import { generate, Observable, switchMap, tap } from 'rxjs';
import { LoggedUser } from '../model/LoggedUser';
import { RoleServiceService } from '../common/role-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = "http://localhost:8082/auth/"

  constructor(private httpClient: HttpClient) { }

  login(auth: AuthRequest): Observable<LoggedUser> {
    this.logOut();
    return this.httpClient.post<{ token: string }>(this.baseUrl + "generateToken", auth).pipe(
      tap(res => {
        console.log("calling generate token")
        localStorage.setItem('jwtToken', res.token)
      }),
      switchMap(() => this.getUserDetails()))

  }



  getUserDetails(): Observable<LoggedUser> {
    console.log("get user details")
    return this.httpClient.get<LoggedUser>(this.baseUrl + "getUserInfo");
  }



  logOut() {
    localStorage.clear()
  }
}
