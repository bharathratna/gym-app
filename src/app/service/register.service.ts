import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRequest } from '../model/UserRequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

   registerBaseurl = "http://localhost:8082/auth"

  constructor(private http: HttpClient) { }
  register(UserRequest : UserRequest): Observable<number>{
    return this.http.post<number>(this.registerBaseurl+"/register", UserRequest);
  }

  check(mobileNo: number): Observable<String> {
    return this.http.get<String>(this.registerBaseurl+"/check?mobileNo="+mobileNo);
  }
}
