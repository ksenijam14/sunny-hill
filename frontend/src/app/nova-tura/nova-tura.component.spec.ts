import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaTuraComponent } from './nova-tura.component';

describe('NovaTuraComponent', () => {
  let component: NovaTuraComponent;
  let fixture: ComponentFixture<NovaTuraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovaTuraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaTuraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
