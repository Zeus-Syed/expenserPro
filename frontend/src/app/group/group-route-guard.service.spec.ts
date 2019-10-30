import { TestBed } from '@angular/core/testing';

import { GroupRouteGuardService } from './group-route-guard.service';

describe('GroupRouteGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupRouteGuardService = TestBed.get(GroupRouteGuardService);
    expect(service).toBeTruthy();
  });
});
