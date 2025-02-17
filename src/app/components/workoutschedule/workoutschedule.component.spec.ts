import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutscheduleComponent } from './workoutschedule.component';

describe('WorkoutscheduleComponent', () => {
  let component: WorkoutscheduleComponent;
  let fixture: ComponentFixture<WorkoutscheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkoutscheduleComponent]
    });
    fixture = TestBed.createComponent(WorkoutscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
