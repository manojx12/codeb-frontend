import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubzoneForm } from './subzone-form';

describe('SubzoneForm', () => {
  let component: SubzoneForm;
  let fixture: ComponentFixture<SubzoneForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubzoneForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubzoneForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
