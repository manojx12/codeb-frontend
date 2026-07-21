import { TestBed } from '@angular/core/testing';

import { Subzone } from './subzone';

describe('Subzone', () => {
  let service: Subzone;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Subzone);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
