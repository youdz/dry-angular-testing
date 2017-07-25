import { Component } from '@angular/core';

import {initContext, TestContext} from '../../testing/test-context';
import { GreetComponent } from './greet.component';

@Component({
  template: `
    <app-greet [name]="name"></app-greet>
  `
})
class TestComponent {
  name = 'World';
}

describe('GreetComponent', () => {
  type Context = TestContext<GreetComponent, TestComponent>;
  initContext(GreetComponent, TestComponent);

  it('offers a [name] input', function(this: Context) {
    this.hostComponent.name = 'Angular';
    this.detectChanges();
    expect(this.testedDirective.name).toBe('Angular');
  });

  it('greets politely', function(this: Context) {
    expect(this.testedElement.textContent).toContain('Hello World');
  });
});


