import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubcontractDetailContainerComponent } from './subcontract-detail/subcontract-detail-container/subcontract-detail-container.component';

const routes: Routes = [
  { path: ':contractId', component: SubcontractDetailContainerComponent},

  // children: [
  //   { path: '', component: ContractsDetailComponent},
  //   { path: 'claims',
  //     loadChildren: () => import ('src/app/main-app/payments/payments.module')
  //     .then(m => m.PaymentsModule)},
  //   { path: 'variations',
  //     loadChildren: () => import ('src/app/main-app/subcontracts/contract-items/contract-items.module')
  //      .then(m => m.ContractItemsModule)}
  // ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubcontractDetailRoutingModule {}
