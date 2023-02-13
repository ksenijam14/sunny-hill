import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkiSkolaComponent } from './ski-skola.component';

describe('SkiSkolaComponent', () => {
  let component: SkiSkolaComponent;
  let fixture: ComponentFixture<SkiSkolaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkiSkolaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkiSkolaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
