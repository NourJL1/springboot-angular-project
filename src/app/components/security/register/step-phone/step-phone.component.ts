import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-phone',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './step-phone.component.html',
  styleUrls: ['./step-phone.component.css'],
})
export class StepPhoneComponent {
  @Input() phone: string = '';
  @Output() phoneChange = new EventEmitter<string>();
}
