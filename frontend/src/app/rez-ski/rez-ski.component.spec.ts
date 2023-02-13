import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RezSkiComponent } from './rez-ski.component';

describe('RezSkiComponent', () => {
  let component: RezSkiComponent;
  let fixture: ComponentFixture<RezSkiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RezSkiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RezSkiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
