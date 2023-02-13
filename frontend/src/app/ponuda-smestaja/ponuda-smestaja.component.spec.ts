import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PonudaSmestajaComponent } from './ponuda-smestaja.component';

describe('PonudaSmestajaComponent', () => {
  let component: PonudaSmestajaComponent;
  let fixture: ComponentFixture<PonudaSmestajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PonudaSmestajaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PonudaSmestajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
