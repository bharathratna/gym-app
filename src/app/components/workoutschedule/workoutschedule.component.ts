import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Variation } from 'src/app/model/Variation';
import { WorkOut } from 'src/app/model/WorkOut';
import { WorkoutServiceService } from 'src/app/service/workout-service.service';

@Component({
  selector: 'app-workoutschedule',
  templateUrl: './workoutschedule.component.html',
  styleUrls: ['./workoutschedule.component.css']
})
export class WorkoutscheduleComponent {

  
  workouts: any[] = []; // Holds the list of workout rows
  workoutList: WorkOut[] = [];
  selectedVariation: Variation[] = []
  workOutGroup: FormGroup;
  // Form fields
  nextday : boolean = true;
  day: number = 0;
  workout: string = '';
  set: number = 0;
  reps: number = 0;
  variation: string = '';
  reference: string = '';

  constructor (private workoutservice: WorkoutServiceService){
    this.getWorkOutList()
    this.workOutGroup = new FormGroup({
      workoutType: new FormControl('', Validators.required),
      set: new FormControl('', Validators.required),
      reps: new FormControl('', Validators.required),
      variation : new FormControl('', Validators.required),
      reference: new FormControl('')
    })
  }

  getWorkOutList(){
    this.workoutservice.getWorkout().subscribe(res => this.workoutList = res)
  }

  selectVariation(variation: any){
    console.log(variation.target.value)
    let workoutId = 0;
    this.workoutList.filter(e => e.workOutName === variation.target.value).forEach(e => workoutId = e.workOutId);
    console.log(workoutId);
    this.workoutservice.getVariationList(workoutId).subscribe(res => {
      this.selectedVariation = res;
    });

  }
  // Add a new workout row
  addWorkout() {
    if(this.workOutGroup.controls['workoutType'].value !== null){
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

  clearField(){
    this.workOutGroup.reset();
  }


  addScheule(){
    if(this.workOutGroup.valid || this.day === 0){
    this.day = this.day + 1;
    this.nextday != this.nextday;
    window.prompt("Updating the work out for day "+ this.day)
    }
  }
}
