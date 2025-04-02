import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationPlaceComponent } from './reservation-place.component';

describe('ReservationPlaceComponent', () => {
  let component: ReservationPlaceComponent;
  let fixture: ComponentFixture<ReservationPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationPlaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
