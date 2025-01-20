import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartViewLeaseRoomComponent } from './smart-view-lease-room.component';

describe('SmartViewLeaseRoomComponent', () => {
  let component: SmartViewLeaseRoomComponent;
  let fixture: ComponentFixture<SmartViewLeaseRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmartViewLeaseRoomComponent],
    });
    fixture = TestBed.createComponent(SmartViewLeaseRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
