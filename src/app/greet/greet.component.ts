import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-greet',
  template: `
    <h1>Hello {{name}}</h1>
  `
})
export class GreetComponent {
  @Input() name: string;
}
