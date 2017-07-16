import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { GreetComponent } from './greet.component';

describe('GreetComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let greetComponent: GreetComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestComponent, GreetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    greetComponent = fixture.debugElement.query(By.directive(GreetComponent)).componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    fixture.nativeElement.remove();
  });

  it('offers a [name] input', () => {
    fixture.componentInstance.name = 'Angular';
    fixture.detectChanges();
    expect(greetComponent.name).toBe('Angular');
  });

  it('greets politely', () => {
    expect(fixture.nativeElement.textContent).toContain('Hello World');
  });
});

@Component({
  template: `
    <app-greet [name]="name"></app-greet>
  `
})
class TestComponent {
  name = 'World';
}
