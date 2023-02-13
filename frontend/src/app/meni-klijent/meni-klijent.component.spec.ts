import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeniKlijentComponent } from './meni-klijent.component';

describe('MeniKlijentComponent', () => {
  let component: MeniKlijentComponent;
  let fixture: ComponentFixture<MeniKlijentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeniKlijentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeniKlijentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
