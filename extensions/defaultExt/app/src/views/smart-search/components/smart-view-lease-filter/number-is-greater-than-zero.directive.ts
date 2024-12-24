import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[scrmNumberIsGreaterThanZero]',
  providers: [{ provide: NG_VALIDATORS, useExisting: NumberIsGreaterThanZeroDirective, multi: true }],
})
export class NumberIsGreaterThanZeroDirective implements Validator {
  private isEmpty(control: AbstractControl): boolean {
    return typeof control.value !== 'string' || control.value.length === 0;
  }

  private isNumberGreaterThanZero(control: AbstractControl): boolean {
    const value = Number(control.value);
    return !isNaN(value) && value > 0;
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    return this.isEmpty(control) || this.isNumberGreaterThanZero(control) ? null : { numberIsGreaterThanZero: true };
  }
}
