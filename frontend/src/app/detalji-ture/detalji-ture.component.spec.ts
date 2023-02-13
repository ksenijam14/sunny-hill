import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaljiTureComponent } from './detalji-ture.component';

describe('DetaljiTureComponent', () => {
  let component: DetaljiTureComponent;
  let fixture: ComponentFixture<DetaljiTureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetaljiTureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaljiTureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
