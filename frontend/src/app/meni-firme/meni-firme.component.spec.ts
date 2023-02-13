import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeniFirmeComponent } from './meni-firme.component';

describe('MeniFirmeComponent', () => {
  let component: MeniFirmeComponent;
  let fixture: ComponentFixture<MeniFirmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeniFirmeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeniFirmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
