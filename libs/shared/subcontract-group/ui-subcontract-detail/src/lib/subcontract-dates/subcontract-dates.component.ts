/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnDestroy, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  UntypedFormControl,
  NG_VALIDATORS,
} from '@angular/forms';
import { Subscription } from 'rxjs';
// import {
//   MAT_MOMENT_DATE_FORMATS,
//   MomentDateAdapter,
// } from '@angular/material-moment-adapter';
import { LuxonDateAdapter, MAT_LUXON_DATE_FORMATS } from '@angular/material-luxon-adapter';
import { DateTime } from 'luxon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { DateUtilsService } from '@workspace/shared/util';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ContractDates } from '@workspace/shared/data-access-models';
import { ImportState } from '@ngrx/store-devtools/src/actions';

@Component({
  selector: 'fourcast-subcontract-dates',
  templateUrl: './subcontract-dates.component.html',
  styleUrls: [
    './subcontract-dates.component.scss',
    '../scss/subcontract-detail.scss',
  ],
  standalone: true,
  imports: [MatDatepickerModule, MatFormFieldModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SubcontractDatesComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SubcontractDatesComponent),
      multi: true,
    },
    { provide: MAT_DATE_LOCALE, useValue: 'en-AU' },
    // {
    //   provide: DateAdapter,
    //   useClass: MomentDateAdapter,
    //   deps: [MAT_DATE_LOCALE],
    // },
    // { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    {
      provide: DateAdapter,
      useClass: LuxonDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_LUXON_DATE_FORMATS },
  ],
})
export class SubcontractDatesComponent
  implements ControlValueAccessor, OnDestroy
{
  datesForm: UntypedFormGroup;
  subscriptions: Subscription[] = [];

  constructor(
    private fb: UntypedFormBuilder,
    private dateUtils: DateUtilsService
  ) {
    this.datesForm = this.fb.group({
      contract: [null, Validators.required],
      commencement: [null, Validators.required],
      completion: [null, Validators.required],
    });

    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.datesForm.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  get value(): ContractDates {
    return this.datesForm.value;
  }

  set value(value: ContractDates) {
    if (value) {
      const newDates = {
        contract: value.contract ? value.contract : null,
        commencement: value.commencement ? value.commencement : null,
        completion: value.completion ? value.completion : null,
      };
      this.datesForm.setValue(newDates);
      this.onChange(newDates);
      this.onTouched();
    }
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  writeValue(value: any): void {
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.datesForm.reset();
    }
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // communicate the inner form validation to the parent form

  validate(_: UntypedFormControl) {
    return this.datesForm.valid ? null : { project: { valid: false } };
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
