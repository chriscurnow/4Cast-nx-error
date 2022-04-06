import { NgModule } from '@angular/core';
import { CurrencyDirective } from './currency.directive';


@NgModule({
  declarations: [CurrencyDirective],
  imports: [
  ],
  exports: [CurrencyDirective,
            ]
})
export class CurrencyUtilitiesModule { }

export * from './currency';
