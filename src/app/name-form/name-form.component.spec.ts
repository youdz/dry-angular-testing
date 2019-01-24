import { Component } from '@angular/core';

import {initContext} from '../../testing/init';
import {TestContext} from '../../testing/test-context';
import {ComponentSpec} from '../../testing/spec-builder';
import { NameFormComponent } from './name-form.component';

@Component({
  template: `
    <app-name-form [(name)]="name"></app-name-form>
  `
})
class TestComponent {
  name: string;
}

describe('NameFormComponent', () => {
  type Context = TestContext<NameFormComponent, TestComponent>;
  initContext(NameFormComponent, TestComponent);

  it('offers a [(name)] two-way binding', function(this: Context) {
    // Input
    this.hostComponent.name = 'World';
    this.detectChanges();
    expect(this.testedDirective.name).toBe('World');
    // Output
    this.testedDirective.update('Angular');
    this.detectChanges();
    expect(this.hostComponent.name).toBe('Angular');
  });

  it('updates and emits the (nameChange) output on input change', function(this: Context) {
    const input = this.query('input');
    input.nativeElement.value = 'World';
    input.triggerEventHandler('change', null);
    this.detectChanges();
    expect(this.testedDirective.name).toBe('World');
    expect(this.hostComponent.name).toBe('World');
  });
});


/*
 * Experimenting with a spec builder for even simpler unit testing
 */

const spec = new ComponentSpec(NameFormComponent);
// spec.hasInput('name');
// spec.hasOutput('nameChange');
spec.hasTwoWayBinding('name');
spec.run();
