import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { WorkoutscheduleComponent } from './components/workoutschedule/workoutschedule.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { BmiComponent } from './components/bmi/bmi.component';
import { ViewScheduleComponent } from './components/view-schedule/view-schedule.component';

const routes: Routes = [
  {path:'', component: LandingPageComponent},
  {path:'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path:'schedule', component: WorkoutscheduleComponent},
  {path: 'checkBmi', component: BmiComponent},
  {path: 'viewSchedule', component: ViewScheduleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
