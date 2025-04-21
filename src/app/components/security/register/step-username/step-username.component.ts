import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-username',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './step-username.component.html',
  styleUrls: ['./step-username.component.css'],
})
export class StepUsernameComponent {
  @Input() username: string = '';
  @Output() usernameChange = new EventEmitter<string>();

  @Input() fullname: string = '';
  @Output() fullnameChange = new EventEmitter<string>();
}
