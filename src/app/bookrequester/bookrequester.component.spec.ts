/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BookrequesterComponent } from './bookrequester.component';

describe('BookrequesterComponent', () => {
  let component: BookrequesterComponent;
  let fixture: ComponentFixture<BookrequesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookrequesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookrequesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
