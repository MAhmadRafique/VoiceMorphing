import { TestBed } from '@angular/core/testing';

import { NavbarItemsService } from './navbar-items.service';

describe('NavbarItemsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavbarItemsService = TestBed.get(NavbarItemsService);
    expect(service).toBeTruthy();
  });
});
