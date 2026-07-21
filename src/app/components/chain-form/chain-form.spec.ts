import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainForm } from './chain-form';

describe('ChainForm', () => {
  let component: ChainForm;
  let fixture: ComponentFixture<ChainForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChainForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChainForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
