/* eslint-disable no-prototype-builtins */

 /**
  *
  * @param data :object to transfer from
  * @param newData: object to transfer to
  * @param property: string name of property to transfer
  *
  * Check to see if property exists on data and if so assigns it to this[property]
  */



export function setTypeValue<T extends object>(
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

export function setTypeValues<T extends object>(data: T | undefined, newData: T, properties: string[]){
  if(data){
     properties.forEach((property) => {
       setTypeValue<T>(data, newData, property);
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
export function setValuesArray<T extends object>(values: T[] | undefined, newValue: T, properties: string[]): T[]{
  const newValues: T[] = [];
  if(values){
    values.forEach(value => {
      setTypeValues<T>(value, newValue, properties)
      newValues.push(newValue)
    })
  }
  return newValues;
}
