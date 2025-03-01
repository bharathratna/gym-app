import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-bmi',
  templateUrl: './bmi.component.html',
  styleUrls: ['./bmi.component.css']
})
export class BmiComponent {
  bmiForm: FormGroup
  bmiValue : number= 0;


  constructor(private studentService : StudentService) {
    this.bmiForm = new FormGroup({
      weight : new FormControl('', [Validators.required, Validators.pattern('^[0-9]{1,}$')]),
      height: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{1,}$')]),
      bodyBmi: new FormControl()
    })
  }


  onCalculate(){
    this.studentService.calaculate(this.bmiForm.value).subscribe(data => {
      this.bmiValue = Number(data);
    })
  }
 

}
