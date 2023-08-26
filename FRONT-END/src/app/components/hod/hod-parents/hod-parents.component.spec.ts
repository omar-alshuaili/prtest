import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HodParentsComponent } from './hod-parents.component';

describe('HodParentsComponent', () => {
  let component: HodParentsComponent;
  let fixture: ComponentFixture<HodParentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HodParentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HodParentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
