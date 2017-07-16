import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NameFormComponent } from './name-form.component';

describe('NameFormComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let nameFormComponent: NameFormComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestComponent, NameFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    nameFormComponent = fixture.debugElement.query(By.directive(NameFormComponent)).componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    fixture.nativeElement.remove();
  });

  it('offers a [(name)] two-way binding', () => {
    // Input
    fixture.componentInstance.name = 'World';
    fixture.detectChanges();
    expect(nameFormComponent.name).toBe('World');
    // Output
    nameFormComponent.update('Angular');
    fixture.detectChanges();
    expect(fixture.componentInstance.name).toBe('Angular');
  });

  it('updates and emits the (nameChange) output on input change', () => {
    const input = fixture.debugElement.query(By.css('input'));
    input.nativeElement.value = 'World';
    input.triggerEventHandler('change', null);
    fixture.detectChanges();
    expect(nameFormComponent.name).toBe('World');
    expect(fixture.componentInstance.name).toBe('World');
  });
});

@Component({
  template: `
    <app-name-form [(name)]="name"></app-name-form>
  `
})
class TestComponent {
  name: string;
}
