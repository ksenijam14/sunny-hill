import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RezTuraComponent } from './rez-tura.component';

describe('RezTuraComponent', () => {
  let component: RezTuraComponent;
  let fixture: ComponentFixture<RezTuraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RezTuraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RezTuraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
