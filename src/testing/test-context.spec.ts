import {DebugElement, Type} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

export interface TestContext<T, H> {
  fixture: ComponentFixture<H>;
  hostComponent: H;
  tested: DebugElement;
  testedDirective: T;
  testedElement: any;
}

export function initContext<T, H>(testedType: Type<T>, hostType: Type<H>) {
  beforeEach(async(function(this: TestContext<T, H>) {
    TestBed.configureTestingModule({
      declarations: [testedType, hostType]
    })
      .compileComponents();
  }));

  beforeEach(function(this: TestContext<T, H>) {
    this.fixture = TestBed.createComponent(hostType);
    this.fixture.detectChanges();
    this.hostComponent = this.fixture.componentInstance;
    const testedDebugElement = this.fixture.debugElement.query(By.directive(testedType));
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



