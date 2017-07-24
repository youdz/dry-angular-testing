import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

import {initContext, TestContext} from '../../testing/test-context.spec';
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
  initContext(NameFormComponent, TestComponent);

  it('offers a [(name)] two-way binding', function(this: TestContext<NameFormComponent, TestComponent>) {
    // Input
    this.hostComponent.name = 'World';
    this.fixture.detectChanges();
    expect(this.testedDirective.name).toBe('World');
    // Output
    this.testedDirective.update('Angular');
    this.fixture.detectChanges();
    expect(this.hostComponent.name).toBe('Angular');
  });

  it('updates and emits the (nameChange) output on input change',
    function(this: TestContext<NameFormComponent, TestComponent>) {
      const input = this.tested.query(By.css('input'));
      input.nativeElement.value = 'World';
      input.triggerEventHandler('change', null);
      this.fixture.detectChanges();
      expect(this.testedDirective.name).toBe('World');
      expect(this.hostComponent.name).toBe('World');
    });
});
