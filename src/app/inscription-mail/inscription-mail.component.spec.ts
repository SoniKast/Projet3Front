import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionMailComponent } from './inscription-mail.component';

describe('InscriptionMailComponent', () => {
  let component: InscriptionMailComponent;
  let fixture: ComponentFixture<InscriptionMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscriptionMailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscriptionMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
