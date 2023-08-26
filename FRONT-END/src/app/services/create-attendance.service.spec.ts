import { TestBed } from '@angular/core/testing';

import { CreateAttendanceService } from './create-attendance.service';

describe('CreateAttendanceService', () => {
  let service: CreateAttendanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateAttendanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
