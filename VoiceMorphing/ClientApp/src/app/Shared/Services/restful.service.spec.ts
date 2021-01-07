import { TestBed } from '@angular/core/testing';

import { RestfulService } from './restful.service';

describe('RestfulService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestfulService = TestBed.get(RestfulService);
    expect(service).toBeTruthy();
  });
});
