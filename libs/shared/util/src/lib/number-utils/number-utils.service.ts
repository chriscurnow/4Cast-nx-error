import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NumberUtilsService {

  constructor() { }

  public stringToLongNumber(val: string): number {
    const longNumber = 0;
    if (val) {
    val = val.replace(/[^0-9 .]/g, ''); // remove all non-numbers except the decimal point

    const decimalPos = val.indexOf('.');

    const len = val.length;
    let decimals = len - decimalPos - 1;

    if (decimalPos < 0) {
      decimals = 0;
    }

    let longStr = '';

    switch (decimals) {
      case 0:
        longStr = val + '00';
        break;

      case 1:
        longStr = val + '0';
        break;

      default:
        longStr = val;
        break;
    }

    longStr = longStr.replace('.', '');

    const longAmount = parseInt(longStr, 10);

    return longAmount;
  } else {
    return null;
  }
  }

  /**
   *
   * @param n1 - string
   * @param n2 - string
   *
   * Takes two numbers represented as strings and returns the sum
   * of the numbers represented as a string;
   */
  public addNumbers(n1: string, n2: string): string {
    // const num1 = this.stringToLongNumber(n1)
    const num1 = parseFloat(n1) * 100;
    const num2 = parseFloat(n2) * 100;

    const sum = (num1 + num2) / 100;
    const result = sum.toString();
    return result;
  }

  /**
   *
   * @param n1 - string
   * @param n2 - string
   *
   * Takes two numbers represented as strings
   * returns the difference (n1 - n2)
   * represented as a string;
   */
  public subtract(n1: string, n2: string): string {
    const num1 = this.stringToLongNumber(n1); // previously multiplied by 100 but stringToLongNumber already returns whole number
    const num2 = this.stringToLongNumber(n2); // ditto
    const diff = (num1 - num2) / 100;

    return diff.toString();
  }

  /**
   *
   * @param n1: string
   * @param n2: string
   * Takes two numbers represented as strings and divides the first number
   * by the second number.
   * Returns the result represented as a string;
   */
  public divide(n1: string, n2: string) {
    const num1 = this.stringToLongNumber(n1);
    const num2 = this.stringToLongNumber(n2);
    const result = num1 / num2;
    const rounded = Math.round(result * 100) / 100;
    return rounded.toString();
  }

  /**
   *
   * @param n1 - string
   * @param n2 - string
   * Takes two numbers represented as strings,
   * Divides the first number by the second number,
   * then multiplies by 100 to get percentage
   * Returns percentage result as a whole number
   * as a string (without % symbol).
   * (example n1 = '26', n2 = '80' result = '33' ie rounded to nearest whole number)
   */
  public percent(n1: string, n2: string) {
    const num1 = parseFloat(n1) * 100;
    const num2 = parseFloat(n2) * 100;
    const result = (num1 / num2) / 10000;
    const percent = Math.round(result * 100);
    return percent.toString();
  }

  /**
   *
   * @param n1 - string
   * @param n2 - string
   * Takes two numbers represented as strings,
   * Multiplies the two numbers
   * Returns the result / 100 represented as a string;
   * (example n1 = '26' n2 = '80' result = '21')
   */
  public percentOf(n1: string, n2: string) {
    const num1 = this.stringToLongNumber(n1);
    const num2 = this.stringToLongNumber(n2);
    const num = (num1 * num2) / 100;
    const result =  Math.round(num);
    return result.toString();
  }
}
