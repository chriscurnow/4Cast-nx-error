import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CompanyListContainerComponent } from './company-list/company-list-container/company-list-container.component';
import { CompanyListUiComponent } from './company-list/company-list-ui/company-list-ui.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
  ],
  declarations: [
    CompanyListContainerComponent,
    CompanyListUiComponent
  ],
})
export class SharedFeatureHeadContractorModule {}
