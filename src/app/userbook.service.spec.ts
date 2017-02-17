/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserbookService } from './userbook.service';

describe('UserbookService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserbookService]
    });
  });

  it('should ...', inject([UserbookService], (service: UserbookService) => {
    expect(service).toBeTruthy();
  }));
});
