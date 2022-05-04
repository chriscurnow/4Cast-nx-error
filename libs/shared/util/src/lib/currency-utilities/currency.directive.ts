/* eslint-disable @angular-eslint/directive-selector */
/* eslint-disable no-prototype-builtins */
import {Directive, ElementRef, forwardRef, HostListener, Input, Output, EventEmitter} from '@angular/core';
import {MAT_INPUT_VALUE_ACCESSOR} from '@angular/material/input';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import Dinero from 'dinero.js';
import { Currency, createCurrency, stringToDinero} from './currency';


@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'input[currencyDirective]',
  providers: [
    {provide: MAT_INPUT_VALUE_ACCESSOR, useExisting: CurrencyDirective},
     {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyDirective),
      multi: true,
    }
    ],

})
export class CurrencyDirective {

  private internalValue: Currency | null;
  private internalReadOnly = false;

  // tslint:disable-next-line: no-output-on-prefix
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onChange = new EventEmitter<Currency>();


  constructor(private elementRef: ElementRef<HTMLInputElement>,
  ) {}


  get value(): Currency | null {
    this.unFormatValue();
    return this.internalValue;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('value')
  set value(value: Currency | null) {
    this.internalValue = value;
    this.formatValue(value);
  }



  private formatValue(value: any) {
    let dVal: Dinero.Dinero | null = null;
    let displayValue = '';


    switch (true) {
      case (value === null):
        displayValue = '';
        break;

      case (value === ''):
        displayValue = '';
        break;

      case (typeof(value) === 'number'):
        dVal = Dinero({amount: value, currency: 'AUD', precision: 2});
        displayValue = dVal.toFormat('0,0.00');
        break;

      case (value.hasOwnProperty('getAmount')):
        dVal = value;
        if(dVal) {
          displayValue = dVal.toFormat('0,0.00');
        } else {
          displayValue = '';
        }

        break;

      default :
        dVal = Dinero(value);
        displayValue = dVal.toFormat('0,0.00');
    }

    this.elementRef.nativeElement.value = displayValue;

  }

@Input() set readonly(value: boolean) {

  this.internalReadOnly = value;
}

get readonly() {
  return this.internalReadOnly;
}


  private unFormatValue() {
    const value = this.elementRef.nativeElement.value;
    this.internalValue = stringToDinero(value);
    const displayValue = value.replace(/[^\d.-]/g, '');
    // this._value = value.replace(/[^\d.-]/g, '');
    if (value) {
      this.elementRef.nativeElement.value = displayValue;
    } else {
      this.elementRef.nativeElement.value = '';
    }
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value: any) {
    this.internalValue = stringToDinero(value);
    // here we cut any non numerical symbols
    // this._value = stringToDinero(value);
    // stringToDinero(value);
    // value.replace(/[^\d.-]/g, '');
    this._onChange(this.internalValue);
  }

  @HostListener('blur')
  _onBlur() {
    this.formatValue(this.internalValue); // add commas
  }

  @HostListener('change')
  _onHostChange() {
    const value = this.elementRef.nativeElement.value;

    this.internalValue = stringToDinero(value);
    if (!this.internalValue){
      this.internalValue = createCurrency();
    }
    this.onChange.emit(this.internalValue);
  }

  @HostListener('focus')
  onFocus() {
    if (!this.internalReadOnly) {
      this.unFormatValue(); // remove commas for editing purpose
    }

  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  _onChange(value: any): void {

  }

  writeValue(value: any) {

    this.internalValue = stringToDinero(value);
    this.formatValue(this.internalValue); // format Value
  }

  registerOnChange(fn: (value: any) => void) {
    this._onChange = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  registerOnTouched() {
  }


}
