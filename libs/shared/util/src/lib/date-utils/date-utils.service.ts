/* eslint-disable no-prototype-builtins */
import { Injectable } from '@angular/core';
import * as _moment from 'moment';
// import { default as _rollupMoment } from 'moment';


const moment =  _moment; // _rollupMoment ||

@Injectable({
  providedIn: 'root'
})
export class DateUtilsService {

  static dateToMoment(value: any) {
    switch (true) {
      case (!value):
        return null;
        break;
      case (value.hasOwnProperty('seconds')):
        return moment.unix(value.seconds);

      case value._isAMomentObject :
        return value;

      default :
        return moment(value);
    }
  }



  static formatDate(date: any, format?: string) {
    // const returnValue = this.dateUtils.setDate(date);
    // return returnValue;
    let dateFormat: string;

    if (format) {
      dateFormat = format;
    } else {
      dateFormat = 'DD/MM/YYYY';
    }

    let momentValue: moment.Moment;

    switch (true) {
      case (moment.isMoment(date)):
        momentValue = date;
        break;

      case (date.hasOwnProperty('seconds')):
        momentValue = moment.unix(date.seconds);
        break;

      default:
        momentValue = moment(date);
    }

    const returnValue = momentValue.format(dateFormat);
    return returnValue;
  }

  public setDate(value: any) {
    const debug = false;
    if (value) {

      // Firestore returns a timestamp with seconds and nanoseconds rather than a date
      // So if its an existing document it will be a timestamp
      // If it is a new document it will be a date and we can use it as is.

      if (value.hasOwnProperty('seconds')) {

        const momentValue = moment.unix(value.seconds);

        // TODO: [FCNG-194] there should be a way to display a date in the locale format
        const returnValue = momentValue.format('DD/MM/YYYY');
        return returnValue;

      } else {
        if (value._isAMomentObject) {
          const returnValue = value.toDate();
          return returnValue;
        } else {

          // TODO: [FCNG-193] we shouldn't be hard coding the format. This is for Australia
          // const returnValue = moment(value).format('DD/MM/YYYY');
          // [FCNG-354] this function should return a date value, not a string

          const returnValue = moment(value).toDate();

          // set prefix to avoid long lines following
          const prefix = 'UTILITY SERVICE set data formatting with fixed format from string';
          if (debug) {
            console.log(`${prefix} value`, value);
          }
          if (debug) {
            console.log(`${prefix} moment value`, moment(value));
          }
          if (debug) {
            console.log(`${prefix} return value`, returnValue);
          }
          if (debug) {
            console.log('');
          }
          return returnValue;
        }
      }
    } else {
      return null;
    }
  }



  public valueToMoment(value: any) {

    switch (true) {
      case (!value):
        return null;
        break;
      case (value.hasOwnProperty('seconds')):
        return moment.unix(value.seconds);

      case value._isAMomentObject :
        return value;

      default :
        return moment(value);
    }

  }
}
