import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepUsernameComponent } from './step-username.component';

describe('StepUsernameComponent', () => {
  let component: StepUsernameComponent;
  let fixture: ComponentFixture<StepUsernameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepUsernameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
