import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CompanyDetailContainerComponent, CompanyListContainerComponent } from '@workspace/shared-global-group-company-group-feature-head-contractor';
import { SharedGlobalCompanyDataAccessCompanyModule } from '../../../data-access-company/src/lib/shared-global-company-data-access-company.module';


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
