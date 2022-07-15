import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CompanyDetailContainerComponent } from './company-detail/company-detail-container/company-detail-container.component'
import { CompanyListContainerComponent } from './company-list/company-list-container/company-list-container.component';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { SharedGlobalCompanyDataAccessCompanyModule } from '@workspace/shared/global/company/data-access-company';


@NgModule({
  imports: [
    CommonModule,
    SharedGlobalCompanyDataAccessCompanyModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      { path: 'list', component: CompanyListContainerComponent },
      { path: 'detail/:companyId', component: CompanyDetailContainerComponent },
    ]),
  ],
})
export class SharedGlobalCompanyFeatureHeadContractorModule {}
