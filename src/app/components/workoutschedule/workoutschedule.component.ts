import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Variation } from 'src/app/model/Variation';
import { WorkOut } from 'src/app/model/WorkOut';
import { WorkoutServiceService } from 'src/app/service/workout-service.service';
import * as bootstrap from 'bootstrap';
import { UserDetail } from 'src/app/model/UserDetail';

@Component({
  selector: 'app-workoutschedule',
  templateUrl: './workoutschedule.component.html',
  styleUrls: ['./workoutschedule.component.css']
})
export class WorkoutscheduleComponent implements AfterViewInit {


  workouts: any[] = []; // Holds the list of workout rows
  workoutList: WorkOut[] = [];
  selectedVariation: Variation[] = []
  workOutGroup: FormGroup;
  userDetail!: UserDetail;
  // Form fields
  // Form fields
  nextday: boolean = true;
  day: number = 0;
  workout: string = '';
  set: number = 0;
  reps: number = 0;
  variation: string = '';
  reference: string = '';
  @ViewChild('toastElement', { static: false }) toastElement!: ElementRef;
  toastInstance!: bootstrap.Toast;

  constructor(private workoutservice: WorkoutServiceService, private router: Router) {
    this.getWorkOutList()
    this.workOutGroup = new FormGroup({
      workoutType: new FormControl('', Validators.required),
      set: new FormControl('', Validators.required),
      reps: new FormControl('', Validators.required),
      variation: new FormControl('', Validators.required),
      reference: new FormControl('')
    })
  }
  ngAfterViewInit(): void {
    this.toastInstance = new bootstrap.Toast(this.toastElement.nativeElement, {
      autohide: true, // Auto-hide after delay
      delay: 3000 // Toast disappears after 3 seconds
    });
  }

  getWorkOutList() {
    this.workoutservice.getWorkout().subscribe(res => this.workoutList = res, err => {
      if (err.status == 403) {
        this.router.navigate(['/login'])
      }
    })
  }

  selectVariation(variation: any) {
    console.log(variation.target.value)
    let workoutId = 0;
    this.workoutList.filter(e => e.workOutName === variation.target.value).forEach(e => workoutId = e.workOutId);
    console.log(workoutId);
    this.workoutservice.getVariationList(workoutId).subscribe(res => {
      this.selectedVariation = res;
    }, err => {
      if (err.status == 403) [
        this.router.navigate(["/login"])
      ]
    });

  }
  // Add a new workout row
  addWorkout() {
    if (this.workOutGroup.controls['workoutType'].value !== null) {
      this.workouts.push({
        day: this.day,
        workout: this.workOutGroup.controls['workoutType'].value,
        set: this.workOutGroup.controls['set'].value,
        reps: this.workOutGroup.controls['reps'].value,
        variation: this.workOutGroup.controls['variation'].value,
        reference: this.reference,
      });
      this.clearField()
      this.nextday = false;
    }
    // Clear input fields for the next entry

  }

  clearField() {
    this.workOutGroup.reset();
  }


  addScheule() {
    if (this.workOutGroup.valid || this.day === 0) {
      this.day = this.day + 1;
      this.nextday != this.nextday;
      this.showToast()
    } else {
      this.day = this.day + 1;
      this.nextday != this.nextday;
      this.showToast()
    }
  }

  showToast() {
    this.toastInstance.show();
  }

  getUser(userId : any){
     this.workoutservice.getUserInfo(userId.value).subscribe(res => {this.userDetail = res;
      console.log(this.userDetail)
     }
      , err => {
      if(err.status === 403){
        this.router.navigate(['/login'])
      }
    })
  }

  addWorkOut() {
  
    this.workoutservice.addWork(this.userDetail.userId, this.workouts).subscribe(res => {
      console.log(res)
    }, error => {
      if(error.status == 403) {
        this.router.navigate(['/login'])
      }
    })
    this.workouts = []
  }
}
