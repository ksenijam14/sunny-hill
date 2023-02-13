import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeniFirmaRegComponent } from './meni-firma-reg.component';

describe('MeniFirmaRegComponent', () => {
  let component: MeniFirmaRegComponent;
  let fixture: ComponentFixture<MeniFirmaRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeniFirmaRegComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeniFirmaRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
