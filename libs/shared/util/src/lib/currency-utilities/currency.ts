import Dinero from 'dinero.js';
import { setTypeValues } from '../data-utils/data-utils';

Dinero.defaultCurrency = 'AUD';
Dinero.defaultPrecision = 2;

export interface Currency {
  amount: number;
  currency?: string;
  precision?: number;
}

export class CurrencyClass implements Currency {
  amount = 0;
  currency?: string;
  precision?: number;
  dinero?: Dinero.Dinero | undefined;
  valuesOnly: Currency;

  static dineroToCurrency(dinero: Dinero.Dinero) {
    return new CurrencyClass({
      amount: dinero.getAmount(),
      currency: dinero.getCurrency(),
      precision: dinero.getPrecision(),
    });
  }

  static interfaceToCurrency(iCurrency: Currency) {
    return iCurrency ? new CurrencyClass({ amount: iCurrency.amount }) : null;
  }

  static objectToCurrency(obj: any) {
    switch (true) {
      case !obj:
        return null;

      // eslint-disable-next-line no-prototype-builtins
      case obj.hasOwnProperty('amount'):
        return obj;

      case typeof obj === 'number':
        return new CurrencyClass(obj);

      case typeof obj === 'string':
        return new CurrencyClass(obj);

      default:
        return new CurrencyClass({
          amount: obj.amount,
          currency: obj.currency,
          precision: obj.precision,
        });
    }
  }

  static createCurrency(currency?: Currency | undefined): Currency {
    const newCurrency = { amount: 0, currency: 'AUD', precision: 2 };
    if (currency) {
      const properties = ['amount', 'currency', 'precision'];
      setTypeValues(currency, newCurrency, properties);
    }

    return newCurrency;
  }

  static currencyToPlain(amount: Currency | Currency): Currency {
    return {
      amount: amount.amount,
      currency: amount.currency,
      precision: amount.precision,
    };
  }

  /**
   *
   * @param data?: CurrencyInterface
   * @returns Currency
   * Takes CurrencyInterface and returns a Currency instante
   * If no parameter provided returns a Currency instance with amount = 0;
   */
  constructor(data?: Currency) {
    if (data) {
      this.amount = data.amount ? data.amount : 0;
      // switch (true) {
      //   case (!data.amount) :
      //     // don't do anything, leave the value at zero
      //     break;
      //   case (typeof(data.amount) === 'string') :
      //     if (typeof(data.amount) === 'string') {
      //       const strVal: string = data.amount;
      //       let num = parseFloat(data.amount);
      //       if ( strVal.indexOf('.') > -1 ) {
      //         num = num * 100;
      //       }
      //       this.amount = num;
      //     }
      //     break;
      //   case (typeof(data.amount) === 'number' ):
      //     // eslint-disable-next-line no-case-declarations
      //     const str = data.amount.toString();
      //     if ( str.indexOf('.') > -1 ) {
      //       this.amount = data.amount * 100;
      //     } else {
      //       this.amount = data.amount;
      //     }
      // }

      const curr: string | undefined = data.currency;
      const prcsn: number | undefined = data.precision;

      const dineroData: any = { amount: this.amount };
      if (curr) {
        dineroData.currency = curr;
      }
      if (prcsn) {
        dineroData.precision = prcsn;
      }
      this.dinero = Dinero(dineroData);

      // setting currency and precision from the dinero object
      // allows us to use the dinero defaults.
    } else {
      this.amount = 0;
      this.dinero = Dinero({ amount: 0 });
    }

    this.currency = this.dinero.getCurrency();
    this.precision = this.dinero.getPrecision();
    this.valuesOnly = {
      amount: this.amount,
      currency: this.currency,
      precision: this.precision,
    };
  }

  public getAmount() {
    if (this.dinero) {
      return this.dinero.getAmount();
    } else {
      return null;
    }
  }

  public toPlainObject() {
    console.log('CURRENCY overriding FourcastBase.toPlainObject');
    if (this.dinero) {
      return this.dinero.toObject();
    } else {
      return null;
    }
  }

  public toFormat(format?: string) {
    if (this.dinero) {
      if (format) {
        return this.dinero.toFormat(format);
      } else {
        return this.dinero.toFormat();
      }
    } else {
      return null;
    }
  }

  public stringToInteger(amt: string): number {
    const decimalIndex = amt.indexOf('.');
    const length = amt.length;
    let numberStr = amt.replace('.', '');

    if (decimalIndex === -1) {
      numberStr = numberStr + '00';
    } else {
      const numDecimals = length - decimalIndex - 1;
      switch (numDecimals) {
        case 1:
          numberStr = numberStr + '0';
          break;

        case 2:
          // don't do anything;
          break;

        default:
        // work out what to do here.
      }
    }

    return parseInt(numberStr, 10);
  }

  public subtract(value: CurrencyClass) {
    if (value && value.dinero && this.dinero) {
      const newValue = this.dinero.subtract(value.dinero);
      return CurrencyClass.dineroToCurrency(newValue);
    } else return new CurrencyClass();
  }

  public add(value: CurrencyClass): CurrencyClass {
    if (this.dinero && value && value.dinero) {
      const dineroValue = this.dinero;
      const newValue = dineroValue.add(value.dinero);
      return CurrencyClass.dineroToCurrency(newValue);
    } else {
      return new CurrencyClass();
    }
  }
}

export function stringToDinero(x: any): Currency | null{

    if (x) {
      // console.log('Helpers stringToDinero, x', x)
      if (typeof(x) === 'string') {
        const decPos = x.indexOf('.');
    // const numDecimals = x.length


        if (decPos === -1 ) {
      x = x + '00';
    } else {
      const numDecimals = x.length - 1 - decPos;
      if (numDecimals === 1) {
        x = x + '0';
      }
    }
        const stringVal = x.replace(/[^\d-]/g, '');
        const numVal: number = parseInt(stringVal, 10);

        const dVal = new CurrencyClass({amount: numVal});
    //  console.log('x', x);
    // console.log('decPos', decPos)
    // console.log('stringVal', stringVal)
    // console.log('numVal', numVal)
    // console.log('dVal', dVal)

        return dVal;
      } else {
        return x;
      }

    } else {
      const result: Currency | null = null;
      return result;
    }



  }

  export function createCurrency(currency?: Currency | undefined): Currency{
    const newCurrency = {amount: 0, currency: 'AUD', precision: 2};
    if(currency){
      const properties = ['amount', 'currency', 'precision'];
      setTypeValues(currency, newCurrency, properties)
    }

    return newCurrency;
  }
