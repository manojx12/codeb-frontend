import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubzoneList } from './subzone-list';

describe('SubzoneList', () => {
  let component: SubzoneList;
  let fixture: ComponentFixture<SubzoneList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubzoneList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubzoneList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
