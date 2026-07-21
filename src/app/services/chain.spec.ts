import { TestBed } from '@angular/core/testing';

import { Chain } from './chain';

describe('Chain', () => {
  let service: Chain;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Chain);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
