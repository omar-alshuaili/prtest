import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HodTeachersComponent } from './hod-teachers.component';

describe('HodTeachersComponent', () => {
  let component: HodTeachersComponent;
  let fixture: ComponentFixture<HodTeachersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HodTeachersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HodTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
