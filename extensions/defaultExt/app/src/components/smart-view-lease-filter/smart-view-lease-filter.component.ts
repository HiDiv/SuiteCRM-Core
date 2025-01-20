import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { LeaseSearchModel } from '../../model';

@Component({
  selector: 'scrm-smart-view-lease-filter',
  templateUrl: './smart-view-lease-filter.component.html',
  styleUrls: ['./smart-view-lease-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmartViewLeaseFilterComponent {
  public filterForm: FormGroup;

  @Input() set filter(filter: LeaseSearchModel | undefined) {
    if (filter) {
      this.filterForm.patchValue(filter);
    }
  }
  @Output() changeFilter = new EventEmitter<LeaseSearchModel>();

  public rentTypes = [
    { value: 'per_sq_m_per_month', label: 'за м²/месяц' },
    { value: 'per_sq_m_per_year', label: 'за м²/год' },
    { value: 'per_month', label: 'в месяц' },
  ];

  constructor(private readonly fb: FormBuilder) {
    this.filterForm = this.fb.group({
      name: this.fb.control<string | null>(null),
      unitSizeFrom: this.fb.control<number | null>(null, [this.positiveNumberValidator('unitSizeFrom')]),
      unitSizeTo: this.fb.control<number | null>(null, [this.positiveNumberValidator('unitSizeTo')]),
      rentFrom: this.fb.control<number | null>(null, [this.positiveNumberValidator('rentFrom')]),
      rentTo: this.fb.control<number | null>(null, [this.positiveNumberValidator('rentTo')]),
      rentType: this.fb.control<string>('per_sq_m_per_year', [Validators.required]),
    });
  }

  private positiveNumberValidator(fieldName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === null) {
        return null;
      }
      const value = Number(control.value);
      return isNaN(value) || value <= 0 ? { [fieldName]: true } : null;
    };
  }

  public onReset(): void {
    this.filterForm.reset();
  }

  public isSubmitDisabled(): boolean {
    return !this.filterForm.valid || !this.filterForm.dirty;
  }

  public onSubmit(): void {
    this.filterForm.markAllAsTouched();
    if (this.filterForm.valid) {
      const result = Object.entries(this.filterForm.value).reduce((acc, [key, value]) => {
        if (value !== '' && value !== null) {
          acc[key] = value;
        }
        return acc;
      }, {} as LeaseSearchModel);
      this.changeFilter.emit(result);
    }
  }

  public isFieldInvalid(field: string): boolean {
    const control = this.filterForm.get(field);
    return !!control && control.invalid && (control.touched || control.dirty);
  }
}
