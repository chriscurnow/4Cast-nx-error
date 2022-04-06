/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataUtilsService {

   /**
  *
  * @param data :object to transfer from
  * @param newData: object to transfer to
  * @param property: string name of property to transfer
  *
  * Check to see if property exists on data and if so assigns it to this[property]
  */



static setValue<T extends object>(
  data: T,
  newData: T,
  property: string
) {
  // We did have:
  // && this.hasOwnProperty(property)
  // but we never would have got here if 'this' didn't have the property

  if (data && newData && Object.prototype.hasOwnProperty.call(data, property)) {
    // the latest update to Angular/Typescript wonb't let us use "this[property]"
    // or data[propertry].
    // the linter allows us to do the following.
    // hopefully it actually works
    const index = Object.keys(data).indexOf(property);
    if (index > -1) {
      const value = Object.values(data)[index];
      Object.defineProperty(newData, property, {
        value,
        enumerable: true,
      });
    }
  }
}

static setValues<T extends object>(data: T | undefined, newData: T, properties: string[]){
  if(data){
     properties.forEach((property) => {
       DataUtilsService.setValue<T>(data, newData, property);
     });
  }

}

/**
 *
 * @param values
 * @param newValue - an initialised value of type T
 * @param properties
 * @returns
 *
 * newValue must be a valid instance of type T.
 * That it must contain all required properties of type T
 * The values of the properties don't matter, they will be overwritten
 */
static setValuesArray<T extends object>(values: T[] | undefined, newValue: T, properties: string[]): T[]{
  const newValues: T[] = [];
  if(values){
    values.forEach(value => {
      DataUtilsService.setValues<T>(value, newValue, properties);
      newValues.push(newValue)
    })
  }
  return newValues;
}

}
