import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartViewBuildingOfficesComponent } from './smart-view-building-offices.component';

describe('SmartViewBuildingOfficesComponent', () => {
  let component: SmartViewBuildingOfficesComponent;
  let fixture: ComponentFixture<SmartViewBuildingOfficesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmartViewBuildingOfficesComponent],
    });
    fixture = TestBed.createComponent(SmartViewBuildingOfficesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
