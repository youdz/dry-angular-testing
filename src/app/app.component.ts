import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-name-form [(name)]="username"></app-name-form>
    <app-greet [name]="username"></app-greet>
  `
})
export class AppComponent {
  username = 'World';
}
