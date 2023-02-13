import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrafikonComponent } from './grafikon.component';

describe('GrafikonComponent', () => {
  let component: GrafikonComponent;
  let fixture: ComponentFixture<GrafikonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrafikonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrafikonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
