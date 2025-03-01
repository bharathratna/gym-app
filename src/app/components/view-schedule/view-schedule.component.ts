import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ViewScheduleService } from 'src/app/service/view-schedule.service';


@Component({
  selector: 'app-view-schedule',
  templateUrl: './view-schedule.component.html',
  styleUrls: ['./view-schedule.component.css']
})
export class ViewScheduleComponent {

  workouts :any = []

  constructor(private router : Router, private viewScheduleservice: ViewScheduleService) {
    if(localStorage.getItem('name') === null){
      this.router.navigate(['/login']);
    }

    this.getScheduleWorkOutList()

  }

  getScheduleWorkOutList(){
    this.viewScheduleservice.getScheduleWorkout(localStorage.getItem('id')!).subscribe(res => {
      this.workouts = res
    }, error => {
      if(error.status == 403){
        this.router.navigate(['/'])
      }
    })
  }


}
