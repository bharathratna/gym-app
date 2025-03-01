import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/service/register.service';
import * as bootstrap from 'bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit {

  formGroup : FormGroup
  registerId: number = 0
  bmi: Number = 0
  errorMessage = ''
  genderList = ['Male', 'Female', 'Transgender']
  user: boolean = false;

  @ViewChild('toastElement', { static: false }) toastElement!: ElementRef;
  toastInstance!: bootstrap.Toast;

  ngAfterViewInit() {
    this.toastInstance = new bootstrap.Toast(this.toastElement.nativeElement, {
      autohide: true, // Auto-hide after delay
      delay: 3000 // Toast disappears after 3 seconds
    });
  }

  constructor(private registerService: RegisterService, private router: Router){
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      mobile: new FormControl('', [Validators.required,Validators.pattern('^[0-9]{10}$'),
         Validators.minLength(10), Validators.maxLength(10)]),
      email: new FormControl('',),
      gender: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)])
    });
    
  }

  onSubmit(){

    let newUserRequest = {
      name: this.formGroup.controls['name'].value,
      age: this.formGroup.controls['age'].value,
      mobileNo: this.formGroup.controls['mobile'].value,
      gender: this.formGroup.controls['gender'].value,
      password: this.formGroup.controls['password'].value,
      confirmPassword: this.formGroup.controls['confirmPassword'].value,
      email: this.formGroup.controls['email'].value,
      indicator: 3
    }
    this.registerService.register(newUserRequest).subscribe(data => {
      this.registerId = data;
      this.showToast();
    }) 
    
    this.formGroup.reset();
    this.router.navigate(['/'])
  }

  checkMobile(){
    console.log("check mobile is called")
    let mobileControl = this.formGroup.controls['mobile'];
    if(mobileControl.valid) {
      this.registerService.check(mobileControl.value).subscribe((data : any ) => {
        if(data.status == 404){
          this.user = true;
          this.showToast()
        }
      })
    }
  }

  showToast() {
    this.toastInstance.show();
  }

}
