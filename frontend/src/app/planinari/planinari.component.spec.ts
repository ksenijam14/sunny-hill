import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaninariComponent } from './planinari.component';

describe('PlaninariComponent', () => {
  let component: PlaninariComponent;
  let fixture: ComponentFixture<PlaninariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaninariComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaninariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
