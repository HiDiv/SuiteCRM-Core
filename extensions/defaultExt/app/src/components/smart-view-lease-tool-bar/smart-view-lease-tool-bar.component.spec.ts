import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartViewLeaseToolBarComponent } from './smart-view-lease-tool-bar.component';

describe('SmartViewLeaseToolBarComponent', () => {
  let component: SmartViewLeaseToolBarComponent;
  let fixture: ComponentFixture<SmartViewLeaseToolBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmartViewLeaseToolBarComponent],
    });
    fixture = TestBed.createComponent(SmartViewLeaseToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
