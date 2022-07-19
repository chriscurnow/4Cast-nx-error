import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GeneralDetailsContainerComponent } from './general-details/general-details-container/general-details-container.component';
import { SubcontractDetailContainerComponent } from './subcontract-detail-component/subcontract-detail-container/subcontract-detail-container.component';
// import { SubcontractItemsContainerComponent } from './subcontract-items-container/subcontract-items-container.component';

const routes: Routes = [
  {
    path: '',
    component: SubcontractDetailContainerComponent,
    children: [
      { path: '', redirectTo: 'general-details', pathMatch: 'full' },
      { path: 'general-details', component: GeneralDetailsContainerComponent },
      {
        path: 'items',
        loadChildren: () =>
          // eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
          import(
            '@workspace/shared/subcontract-group/feature-subcontract-item'
          ).then((m) => m.SharedSubcontractGroupFeatureSubcontractItemModule),
        // component: SubcontractItemsContainerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubcontractDetailRoutingModule { }
