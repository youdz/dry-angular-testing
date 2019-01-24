import {MATCHERS} from './matchers';
import {Type} from '@angular/core';
import {async, TestBed, TestModuleMetadata} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {TestContext} from './test-context';

export function initContext<T, H>(testedType: Type<T>, hostType: Type<H>, moduleMetadata: TestModuleMetadata = {}) {
  beforeEach(function() {
    /*
     * I feel dirty writing this, but Jasmine creates plain objects
     * and modifying their prototype is definitely a bad idea
     */
    Object.assign(this, TestContext.prototype);
    // We add the custom matchers that work directly on TestContext
    jasmine.addMatchers(MATCHERS);
  });

  beforeEach(async(function(this: TestContext<T, H>) {
    const declarations = [ testedType, hostType ];
    if (moduleMetadata && moduleMetadata.declarations) {
      declarations.push(...moduleMetadata.declarations);
    }
    TestBed.configureTestingModule({...moduleMetadata, declarations: declarations})
      .compileComponents();
  }));

  beforeEach(function(this: TestContext<T, H>) {
    this.fixture = TestBed.createComponent(hostType);
    this.fixture.detectChanges();
    this.hostComponent = this.fixture.componentInstance;
    const testedDebugElement = this.fixture.debugElement.query(By.directive(testedType));
    // On larger project, it would be recommended to throw an error here if the tested directive can't be found.
    this.tested = testedDebugElement;
    this.testedDirective = testedDebugElement.injector.get(testedType);
    this.testedElement = testedDebugElement.nativeElement;
  });

  afterEach(function(this: TestContext<T, H>) {
    if (this.fixture) {
      this.fixture.destroy();
      this.fixture.nativeElement.remove();
    }
  });
}
