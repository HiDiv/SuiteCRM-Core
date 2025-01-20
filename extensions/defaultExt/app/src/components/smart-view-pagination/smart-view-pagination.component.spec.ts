import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartViewPaginationComponent } from './smart-view-pagination.component';

describe('SmartViewPaginationComponent', () => {
  let component: SmartViewPaginationComponent;
  let fixture: ComponentFixture<SmartViewPaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmartViewPaginationComponent],
    });
    fixture = TestBed.createComponent(SmartViewPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
