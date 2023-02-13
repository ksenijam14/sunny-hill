import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledTuraComponent } from './pregled-tura.component';

describe('PregledTuraComponent', () => {
  let component: PregledTuraComponent;
  let fixture: ComponentFixture<PregledTuraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledTuraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PregledTuraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
