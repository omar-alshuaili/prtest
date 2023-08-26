import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HodSubjectsComponent } from './hod-subjects.component';

describe('HodSubjectsComponent', () => {
  let component: HodSubjectsComponent;
  let fixture: ComponentFixture<HodSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HodSubjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HodSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
