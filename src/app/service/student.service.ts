import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BMIRequest } from '../model/BMIRequest';
import { client } from '../model/client';
import { UserRequest } from '../model/UserRequest';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private gymBaseUrl = "http://localhost:1234/v1/api/gym"
  constructor(private http: HttpClient) { }


  calaculate(bmiRequest : BMIRequest): Observable<Number>{
    return this.http.post<Number>(this.gymBaseUrl+"/calculate", bmiRequest);
  }


  
}
