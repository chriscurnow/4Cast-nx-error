// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const config = {
  apiKey: 'AIzaSyDDC8OlxiOrUK7dokf0Ad12dX3vorS6wag',
  authDomain: 'fourcastpro.firebaseapp.com',
  databaseURL: 'https://fourcastpro.firebaseio.com',
  projectId: 'fourcastpro',
  storageBucket: 'fourcastpro.appspot.com',
  messagingSenderId: '346034054648',
};

export const environment = {
  production: false,
  firebaseConfig: config
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
