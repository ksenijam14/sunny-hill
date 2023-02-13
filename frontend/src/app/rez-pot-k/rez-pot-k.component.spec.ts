import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RezPotKComponent } from './rez-pot-k.component';

describe('RezPotKComponent', () => {
  let component: RezPotKComponent;
  let fixture: ComponentFixture<RezPotKComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RezPotKComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RezPotKComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
