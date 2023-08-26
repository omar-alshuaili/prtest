import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoddashboardComponent } from './hoddashboard.component';

describe('HoddashboardComponent', () => {
  let component: HoddashboardComponent;
  let fixture: ComponentFixture<HoddashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoddashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HoddashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
