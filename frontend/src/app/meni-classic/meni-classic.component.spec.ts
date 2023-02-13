import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeniClassicComponent } from './meni-classic.component';

describe('MeniClassicComponent', () => {
  let component: MeniClassicComponent;
  let fixture: ComponentFixture<MeniClassicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeniClassicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeniClassicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
