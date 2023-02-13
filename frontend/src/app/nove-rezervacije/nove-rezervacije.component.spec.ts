import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoveRezervacijeComponent } from './nove-rezervacije.component';

describe('NoveRezervacijeComponent', () => {
  let component: NoveRezervacijeComponent;
  let fixture: ComponentFixture<NoveRezervacijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoveRezervacijeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoveRezervacijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
