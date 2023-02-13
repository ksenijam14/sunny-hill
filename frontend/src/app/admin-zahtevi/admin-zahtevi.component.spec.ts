import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminZahteviComponent } from './admin-zahtevi.component';

describe('AdminZahteviComponent', () => {
  let component: AdminZahteviComponent;
  let fixture: ComponentFixture<AdminZahteviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminZahteviComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminZahteviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
