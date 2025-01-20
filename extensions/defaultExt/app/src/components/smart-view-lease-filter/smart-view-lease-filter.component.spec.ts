import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartViewLeaseFilterComponent } from './smart-view-lease-filter.component';

describe('SmartViewLeaseFilterComponent', () => {
  let component: SmartViewLeaseFilterComponent;
  let fixture: ComponentFixture<SmartViewLeaseFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmartViewLeaseFilterComponent],
    });
    fixture = TestBed.createComponent(SmartViewLeaseFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
