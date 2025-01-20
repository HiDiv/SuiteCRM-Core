import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartViewLeaseOrderComponent } from './smart-view-lease-order.component';

describe('SmartViewLeaseOrderComponent', () => {
  let component: SmartViewLeaseOrderComponent;
  let fixture: ComponentFixture<SmartViewLeaseOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmartViewLeaseOrderComponent],
    });
    fixture = TestBed.createComponent(SmartViewLeaseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
