import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HodsComponent } from './hods.component';

describe('HodsComponent', () => {
  let component: HodsComponent;
  let fixture: ComponentFixture<HodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
