import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-name-form',
  template: `
    <label>What's your name?</label>
    <input #nameInput [value]="name" (change)="update(nameInput.value)" />
  `
})
export class NameFormComponent {
  @Input() name: string;
  @Output() nameChange = new EventEmitter<string>();

  update(newValue: string) {
    this.name = newValue;
    this.nameChange.emit(newValue);
  }
}
