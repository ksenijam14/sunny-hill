import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RezSmestajComponent } from './rez-smestaj.component';

describe('RezSmestajComponent', () => {
  let component: RezSmestajComponent;
  let fixture: ComponentFixture<RezSmestajComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RezSmestajComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RezSmestajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
