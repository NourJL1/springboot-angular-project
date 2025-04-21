import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepPhoneComponent } from './step-phone.component';

describe('StepPhoneComponent', () => {
  let component: StepPhoneComponent;
  let fixture: ComponentFixture<StepPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepPhoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
