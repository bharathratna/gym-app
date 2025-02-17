import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkOut } from '../model/WorkOut';
import { Variation } from '../model/Variation';

@Injectable({
  providedIn: 'root'
})
export class WorkoutServiceService {

  baseUrl = "http://localhost:1234/v1/api/workout";
  constructor(private http : HttpClient) { }

  
  getWorkout(): Observable<WorkOut[]>{
      return this.http.get<WorkOut[]>(this.baseUrl+"/all");
  }
  getVariationList(workoutId: number): Observable<Variation[]>{
    return this.http.get<Variation[]>(this.baseUrl+"/variation?id="+workoutId)
  }
}
