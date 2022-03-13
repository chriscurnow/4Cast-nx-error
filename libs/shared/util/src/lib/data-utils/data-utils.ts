/* eslint-disable no-prototype-builtins */

 /**
  *
  * @param data :object to transfer from
  * @param newData: object to transfer to
  * @param property: string name of property to transfer
  *
  * Check to see if property exists on data and if so assigns it to this[property]
  */
 export function setValue(data: object, newData: object, property: string) {

  // We did have:
  // && this.hasOwnProperty(property)
  // but we never would have got here if 'this' didn't have the property




  if (data && newData && data.hasOwnProperty(property) ) {

    const dataObj: any = data;


    // the latest update to Angular/Typescript wonb't let us use "this[property]"
    // or data[propertry].
    // the linter allows us to do the following.
    // hopefully it actually works

   const value: any = dataObj[property]
   Object.defineProperty(newData, property, {
     value,
     enumerable: true})

  }
}
