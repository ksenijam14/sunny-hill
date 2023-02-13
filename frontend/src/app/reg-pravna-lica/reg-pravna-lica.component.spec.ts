import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegPravnaLicaComponent } from './reg-pravna-lica.component';

describe('RegPravnaLicaComponent', () => {
  let component: RegPravnaLicaComponent;
  let fixture: ComponentFixture<RegPravnaLicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegPravnaLicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegPravnaLicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
