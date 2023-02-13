import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdbijeneRezComponent } from './odbijene-rez.component';

describe('OdbijeneRezComponent', () => {
  let component: OdbijeneRezComponent;
  let fixture: ComponentFixture<OdbijeneRezComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdbijeneRezComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OdbijeneRezComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
