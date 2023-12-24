import { TestBed } from '@angular/core/testing';

import { NaviagtionService } from './naviagtion.service';

describe('NaviagtionService', () => {
  let service: NaviagtionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NaviagtionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
