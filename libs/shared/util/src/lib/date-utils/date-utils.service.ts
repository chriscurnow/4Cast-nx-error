
import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
// import { default as _rollupMoment } from 'moment';

// TODO: Refactor date-utils without moment
// 'moment is not callable'
// This problem only occurs when we try to build the 'functions' directory
// Moment is deprecated anyway

export interface DateTimestamp {
  seconds: number;
  nanoseconds: number;
}

@Injectable({
  providedIn: 'root',
})
export class DateUtilsService {
  /**
   *
   * @param value
   * @returns
   *
   * DO NOT USE
   * Maintained only backward compatability but does nothing
   * Returns value provided
   */
  static dateToMoment(value: any) {
    return value;
  }

  static formatDate(date: string, format?: string) {
    // const returnValue = this.dateUtils.setDate(date);
    // return returnValue;
    try {
      const dt = DateTime.fromISO(date);
      return dt.toLocaleString();
    } catch (error) {
      return '#DATE-ERROR';
    }
  }

  /**
   *
   * @param timestamp: DateTimestamp
   * @returns n: milliseconds | undefined
   *
   * Takes a timesamp returned from Firestore and converts to milliseconds
   */
  setDateFromTimestamp(timestamp: DateTimestamp | undefined): number | undefined {
    // console-log('SUBCONTRACT ITEM SERVICE setDateFromTimestamp, timestamp', timestamp)
    if (timestamp) {
      const seconds: number =
        timestamp.seconds + timestamp.nanoseconds / 1000000;
      const m: number = seconds * 1000;
      // console-log('SUBCONTRACT ITEM SERVICE return value', m);
      return m;
    } else {
      return undefined;
    }
  }

  /**
   *
   * @param value
   * @returns
   *
   * TODO complete this method
   * Currently it just returns the value provide
   */
  public setDate(value: any) {
    return value;
  }

  /**
   *
   * @param value
   * @returns value provided
   *
   * THIS METHOD DOES NOTHING
   */
  public valueToMoment(value: any) {
    return value;
  }
}
