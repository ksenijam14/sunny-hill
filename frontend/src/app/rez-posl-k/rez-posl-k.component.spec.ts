import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RezPoslKComponent } from './rez-posl-k.component';

describe('RezPoslKComponent', () => {
  let component: RezPoslKComponent;
  let fixture: ComponentFixture<RezPoslKComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RezPoslKComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RezPoslKComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
