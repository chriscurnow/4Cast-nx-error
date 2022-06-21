import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedDataAccessHeadContractorModule } from '@workspace/shared/data-access-head-contractor'
import { CompanyListContainerComponent } from './company-list/company-list-container/company-list-container.component';
import { CompanyListUiComponent } from './company-list/company-list-ui/company-list-ui.component';
import { CompanyDetailContainerComponent } from './company-detail/company-detail-container/company-detail-container.component';
import { CompanyDetailUiComponent } from './company-detail/company-detail-ui/company-detail-ui.component';

@NgModule({
  imports: [
    CommonModule,
    SharedDataAccessHeadContractorModule,
    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
  ],
  declarations: [
    CompanyListContainerComponent,
    CompanyListUiComponent,
    CompanyDetailContainerComponent,
    CompanyDetailUiComponent,
  ],
})
export class SharedFeatureHeadContractorModule {}
