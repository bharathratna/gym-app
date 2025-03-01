import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { RegisterComponent } from './components/register/register.component';
import { WorkoutscheduleComponent } from './components/workoutschedule/workoutschedule.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './auth/auth-interceptor.interceptor';
import { BmiComponent } from './components/bmi/bmi.component';
import { ViewScheduleComponent } from './components/view-schedule/view-schedule.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    WorkoutscheduleComponent,
    LandingPageComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    BmiComponent,
    ViewScheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
