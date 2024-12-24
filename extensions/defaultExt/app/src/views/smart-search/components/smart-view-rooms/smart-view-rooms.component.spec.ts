import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartViewRoomsComponent } from './smart-view-rooms.component';

describe('SmartViewRoomsComponent', () => {
  let component: SmartViewRoomsComponent;
  let fixture: ComponentFixture<SmartViewRoomsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmartViewRoomsComponent],
    });
    fixture = TestBed.createComponent(SmartViewRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
