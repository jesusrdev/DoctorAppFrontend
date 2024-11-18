import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialtyModalComponent } from './specialty-modal.component';

describe('SpecialtyModalComponent', () => {
  let component: SpecialtyModalComponent;
  let fixture: ComponentFixture<SpecialtyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpecialtyModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialtyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
