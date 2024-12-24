import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { deepClone } from 'common';

import { LeaseSearchModel } from '../../../../model';

const initFilter: LeaseSearchModel = { rentType: 'per_sq_m_per_year' };

@Component({
  selector: 'scrm-smart-view-lease-filter',
  templateUrl: './smart-view-lease-filter.component.html',
  styleUrls: ['./smart-view-lease-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmartViewLeaseFilterComponent implements OnInit {
  @Input() filter: LeaseSearchModel = deepClone(initFilter);
  @Output() changeFilter = new EventEmitter<LeaseSearchModel>();

  public filterData: LeaseSearchModel = deepClone(initFilter);

  public rentTypes = [
    { value: 'per_sq_m_per_month', label: 'за м²/месяц' },
    { value: 'per_sq_m_per_year', label: 'за м²/год' },
    { value: 'per_month', label: 'в месяц' },
  ];

  public onReset(): void {
    this.filterData = deepClone(initFilter);
  }

  public onSubmit(): void {
    this.changeFilter.emit(this.filterData);
  }

  public classHelper(control?: AbstractControl): string {
    if (control?.touched && control?.valid) {
      return 'is-valid';
    }
    if (control?.touched && control?.invalid) {
      return 'is-invalid';
    }
    return '';
  }

  public ngOnInit(): void {
    this.filterData = deepClone(this.filter);
  }
}
