import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-email',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './step-email.component.html',
  styleUrls: ['./step-email.component.css'],
})
export class StepEmailComponent {
  @Input() email: string = '';
  @Output() emailChange = new EventEmitter<string>();

  @Input() password: string = '';
  @Output() passwordChange = new EventEmitter<string>();
}

