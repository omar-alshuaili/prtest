import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HodStudentsComponent } from './hod-students.component';

describe('HodStudentsComponent', () => {
  let component: HodStudentsComponent;
  let fixture: ComponentFixture<HodStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HodStudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HodStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
