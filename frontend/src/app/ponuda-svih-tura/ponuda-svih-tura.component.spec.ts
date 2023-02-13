import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PonudaSvihTuraComponent } from './ponuda-svih-tura.component';

describe('PonudaSvihTuraComponent', () => {
  let component: PonudaSvihTuraComponent;
  let fixture: ComponentFixture<PonudaSvihTuraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PonudaSvihTuraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PonudaSvihTuraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
