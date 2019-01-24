import { Component } from '@angular/core';

import {initContext} from '../../testing/init';
import {TestContext} from '../../testing/test-context';
import {ComponentSpec} from '../../testing/spec-builder';
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

  it('receives a [name] input', function(this: Context) {
    this.hostComponent.name = 'Angular';
    this.detectChanges();
    expect(this.testedDirective.name).toBe('Angular');
  });

  it('greets politely', function(this: Context) {
    expect(this).toDisplay('Hello World');
  });
});



/*
 * Experimenting with a spec builder for even simpler unit testing
 */

const spec = new ComponentSpec(GreetComponent);
spec.hasInput('name');
spec.set('name', 'World').displays('Hello World');
spec.run();
