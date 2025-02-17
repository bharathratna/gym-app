import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentService } from 'src/app/service/student.service';
import { BMIRequest } from 'src/app/model/BMIRequest';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formGroup : FormGroup
  registerId: number = 0
  bmi: Number = 0
  errorMessage = ''
  constructor(private studentService: StudentService,){
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      mobile: new FormControl('', [Validators.required,Validators.pattern('^[0-9]{10}$')]),
      weight: new FormControl('', Validators.required),
      height: new FormControl('', Validators.required),
      bodyBmi: new FormControl(this.bmi, Validators.required)
    });
    
  }

  onCalculate(){
    console.log("this method is called")
    this.studentService.calaculate(this.formGroup.value).subscribe((data) => {
      console.log(data)
      this.bmi = data;
      this.formGroup.controls['bodyBmi'].setValue(this.bmi.toFixed(2))
    })

  }

  onSubmit(){
    this.studentService.register(this.formGroup.value).subscribe(data => {
      this.registerId = data;
    }) 
  }

}
