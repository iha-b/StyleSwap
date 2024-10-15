import { TestBed } from '@angular/core/testing';

import { UserEntriesService } from './user-entries.service';

describe('UserEntriesService', () => {
  let service: UserEntriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserEntriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
