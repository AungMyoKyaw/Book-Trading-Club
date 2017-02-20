/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MybooksComponent } from './mybooks.component';

describe('MybooksComponent', () => {
  let component: MybooksComponent;
  let fixture: ComponentFixture<MybooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MybooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MybooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
