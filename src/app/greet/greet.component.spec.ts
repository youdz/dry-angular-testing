import { Component } from '@angular/core';

import {initContext, TestContext} from '../../testing/test-context.spec';
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
  initContext(GreetComponent, TestComponent);

  it('offers a [name] input', function(this: TestContext<GreetComponent, TestComponent>) {
    this.hostComponent.name = 'Angular';
    this.fixture.detectChanges();
    expect(this.testedDirective.name).toBe('Angular');
  });

  it('greets politely', function(this: TestContext<GreetComponent, TestComponent>) {
    expect(this.testedElement.textContent).toContain('Hello World');
  });
});


