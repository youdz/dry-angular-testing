import {DebugElement} from '@angular/core';
import {ComponentFixture} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

export class TestContext<T, H> {
  fixture: ComponentFixture<H>;
  hostComponent: H;
  tested: DebugElement;
  testedDirective: T;
  testedElement: any;

  /*
   * Add any shortcuts you may need.
   * Here is an example of one, but you could for instance add shortcuts to:
   * - query native elements directly by CSS selector
   * - request providers from the tested directive's injector
   * - ...
   */
  detectChanges() {
    this.fixture.detectChanges();
  }

  query(cssSelector: string) {
    return this.fixture.debugElement.query(By.css(cssSelector));
  }
}


