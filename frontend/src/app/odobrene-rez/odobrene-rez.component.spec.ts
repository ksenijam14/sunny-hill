import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdobreneRezComponent } from './odobrene-rez.component';

describe('OdobreneRezComponent', () => {
  let component: OdobreneRezComponent;
  let fixture: ComponentFixture<OdobreneRezComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdobreneRezComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OdobreneRezComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
