import { TestBed, inject } from '@angular/core/testing';

import { NavServiceService } from './nav-service.service';

describe('NavServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavServiceService]
    });
  });

  it('should be created', inject([NavServiceService], (service: NavServiceService) => {
    expect(service).toBeTruthy();
  }));
});
