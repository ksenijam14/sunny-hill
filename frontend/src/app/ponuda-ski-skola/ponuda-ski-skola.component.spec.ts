import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PonudaSkiSkolaComponent } from './ponuda-ski-skola.component';

describe('PonudaSkiSkolaComponent', () => {
  let component: PonudaSkiSkolaComponent;
  let fixture: ComponentFixture<PonudaSkiSkolaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PonudaSkiSkolaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PonudaSkiSkolaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
