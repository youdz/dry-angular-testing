/*
 * Highly experimental, I am just trying out ideas here. Please don't use this in production.
 */

import {Component, Type} from '@angular/core';
import {TestContext} from './test-context';
import {GreetComponent} from '../app/greet/greet.component';
import {TestBed, TestModuleMetadata} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {MATCHERS} from './matchers';

const ANNOTATIONS = '__annotations__';

@Component({
  template: ``
})
export class TestComponent<T> {

}

export class ComponentSpec<T> {
  constructor(public componentClass: Type<T>) {}

  private specs: (() => void)[] = [];
  private setups: (() => void)[] = [];
  private moduleMetadata: TestModuleMetadata = {declarations: [ this.componentClass, TestComponent ]};

  private get selector() {
    // FIXME: obviously this uses private Angular APIs and only works in my simple examples. Just prototyping.
    return this.componentClass[ANNOTATIONS][0].selector;
  }

  configureTestingModule(moduleDef: TestModuleMetadata) {
    const declarations = [ this.componentClass, TestComponent ];
    if (moduleDef && moduleDef.declarations) {
      declarations.push(...moduleDef.declarations);
    }
    this.moduleMetadata = {...moduleDef, declarations};
    return this;
  }

  private initTest(testContext: TestContext<T, TestComponent<T>>) {
    TestBed.configureTestingModule(this.moduleMetadata)
      .overrideTemplate(TestComponent, `<${this.selector}></${this.selector}>`)
      .compileComponents();
    testContext.fixture = TestBed.createComponent<TestComponent<T>>(TestComponent);
    testContext.fixture.detectChanges();
    testContext.hostComponent = testContext.fixture.componentInstance;
    // On larger project, it would be recommended to throw an error here if the tested directive can't be found.
    testContext.tested = testContext.fixture.debugElement.query(By.directive(this.componentClass));
    testContext.testedDirective = testContext.tested.injector.get(this.componentClass);
    testContext.testedElement = testContext.tested.nativeElement;
  }

  hasInput(inputProperty: keyof T, inputName?: string) {
    this.specs.push(() => {
      it('receives a [' + inputName + '] input', () => {
        // FIXME: obviously this isn't safe, but we're doing quick prototyping
        const inputs = (this.componentClass as any).ngBaseDef.inputs;
        expect(inputs.hasOwnProperty(inputProperty))
          .toBeTruthy(`${this.componentClass.name} does not declare a @Input(${inputName || ''}) ${inputProperty}.`);
        expect(inputs[inputProperty])
          .toBe(inputName, `${this.componentClass.name} does not declare a @Input(${inputName || ''}) ${inputProperty}.`);
      });
    });
  }

  hasOutput(outputProperty: keyof T, ouputName?: string) {
    this.specs.push(() => {
      it('offers a (' + ouputName + ') output', () => {
        // FIXME: obviously this isn't safe, but we're doing quick prototyping
        const inputs = (this.componentClass as any).ngBaseDef.outputs;
        expect(inputs.hasOwnProperty(outputProperty))
          .toBeTruthy(`${this.componentClass.name} does not declare a @Output(${ouputName || ''}) ${outputProperty}.`);
        expect(inputs[outputProperty])
          .toBe(ouputName, `${this.componentClass.name} does not declare a @Output(${ouputName || ''}) ${outputProperty}.`);
      });
    });
  }

  hasTwoWayBinding(bindingProperty: keyof T, bindingName?: string) {
    this.hasInput(bindingProperty, bindingName);
    this.hasOutput(<keyof T>(bindingProperty + 'Change'), bindingName ? bindingName + 'Change' : undefined);
  }

  setup(actions: (this: TestContext<T, TestComponent<T>>) => void) {
    this.setups.push(actions);
    return this;
  }

  set<K extends keyof T>(property: K, value: T[K]) {
    return this.setup(function() { this.testedDirective[property] = value; });
  }

  displays(text: string) {
    const that = this;
    this.specs.push(() => {
      it('displays ' + text, function(this: TestContext<T, TestComponent<T>>) {
        that.initTest(this);
        that.setups.forEach(s => s.call(this));
        // Clear setups so the next test can have its own.
        that.setups.length = 0;
        this.fixture.detectChanges();
        expect(this).toDisplay(text);
        this.fixture.destroy();
      });
    });
  }

  run() {
    describe(this.componentClass.name + ' component', () => {
      beforeEach(() => jasmine.addMatchers(MATCHERS));
      this.specs.forEach(spec => spec());
    });
  }

}
