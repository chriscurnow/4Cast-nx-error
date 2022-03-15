/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnDestroy, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  NG_VALIDATORS,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { DateUtilsService } from '@workspace/shared/util';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ContractDates } from '@workspace/shared/data-access-models';

@Component({
  selector: 'fourcast-subcontract-dates',
  templateUrl: './subcontract-dates.component.html',
  styleUrls: [
    './subcontract-dates.component.scss',
    '../scss/subcontract-detail.scss',
  ],
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
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class SubcontractDatesComponent implements ControlValueAccessor, OnDestroy {
  datesForm: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder, private dateUtils: DateUtilsService) {
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
    console.log('Dates component, set value', value);
    const newDates = {
      contract: this.dateUtils.valueToMoment(value.contract),
      commencement: this.dateUtils.valueToMoment(value.commencement),
      completion: this.dateUtils.valueToMoment(value.completion),
    };
    this.datesForm.setValue(newDates);
    this.onChange(newDates);
    this.onTouched();
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

  validate(_: FormControl) {
    return this.datesForm.valid ? null : { project: { valid: false } };
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
