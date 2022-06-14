/* eslint-disable @angular-eslint/directive-selector */
/* eslint-disable no-prototype-builtins */
import {Directive, ElementRef, forwardRef, HostListener, Input, Output, EventEmitter} from '@angular/core';
import {MAT_INPUT_VALUE_ACCESSOR} from '@angular/material/input';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

import { Currency, CurrencyClass,  stringToDinero} from './currency';



@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'input[currencyDirective]',
  providers: [
    { provide: MAT_INPUT_VALUE_ACCESSOR, useExisting: CurrencyDirective },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyDirective),
      multi: true,
    },
  ],
})
export class CurrencyDirective {
  private _value: CurrencyClass | null;
  private internalReadOnly = false;

  // tslint:disable-next-line: no-output-on-prefix
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onChange = new EventEmitter<Currency>();

  constructor(private elementRef: ElementRef<HTMLInputElement>) {}

  get value(): Currency | null | undefined {
    this.unFormatValue();
    return this._value?.valuesOnly;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('value')
  set value(value: Currency | null | undefined) {
    const temp = new CurrencyClass(value);
    this.setValue(temp);
    this.formatValue(this._value);
  }

  private formatValue(value: CurrencyClass| null) {
    // console-log('CURRENCY DIRECTIVE formatValue', value);
    let displayValue: string | null = '';

  if( value === null || value === undefined){
     displayValue = '';
  } else {
     displayValue = value.toFormat('0,0.00');
  }

    this.elementRef.nativeElement.value = displayValue as string;
  }

  @Input() set readonly(value: boolean) {
    this.internalReadOnly = value;
  }

  get readonly() {
    return this.internalReadOnly;
  }

  private unFormatValue() {
    const value = this.elementRef.nativeElement.value;
    this.value = stringToDinero(value);
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
    this.setValue(stringToDinero(value));
    // here we cut any non numerical symbols
    // this._value = stringToDinero(value);
    // stringToDinero(value);
    // value.replace(/[^\d.-]/g, '');
    const returnValue = this._value ? this._value.valuesOnly : null
    this._onChange(returnValue);
  }

  @HostListener('blur')
  _onBlur() {
    this.formatValue(this._value); // add commas
  }

  @HostListener('change')
  _onHostChange() {
    const value = this.elementRef.nativeElement.value;

    this.setValue(stringToDinero(value));
    if (!this._value) {
      this.setValue(new CurrencyClass());
    }
    // console-log('CURRENCY DIRECTIVE host listern on change, value', this._value?.valuesOnly)
    this.onChange.emit(this._value?.valuesOnly);
  }

  @HostListener('focus')
  onFocus() {
    if (!this.internalReadOnly) {
      this.unFormatValue(); // remove commas for editing purpose
    }
  }

  setValue(value: any) {
    // console-log('CURRENCY DIRECTIVE set value, input value', value);
    this._value = value;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  _onChange(value: any): void {}

  writeValue(value: any) {
    const currency = new CurrencyClass(value)
    this.setValue(currency);
    this.formatValue(this._value); // format Value
  }

  registerOnChange(fn: (value: any) => void) {
    this._onChange = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  registerOnTouched() {}
}
