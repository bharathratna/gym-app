import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewScheduleService {

  
  private baseUrl = "http://localhost:1234/v1/api/workout/getWorkOut";
  constructor(private httpClient : HttpClient) { }

  getScheduleWorkout(userId: string): Observable<any>{
    return this.httpClient.get<any>(this.baseUrl+"?id="+ userId);
  }
}
