import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubcontractDetailComponent } from './subcontract-detail/subcontract-detail.component';

const routes: Routes = [
    { path: '', component: SubcontractDetailComponent},

    // children: [
    //   { path: '', component: ContractsDetailComponent},
    //   { path: 'claims',
    //     loadChildren: () => import ('src/app/main-app/payments/payments.module')
    //     .then(m => m.PaymentsModule)},
    //   { path: 'variations',
    //     loadChildren: () => import ('src/app/main-app/subcontracts/contract-items/contract-items.module')
    //      .then(m => m.ContractItemsModule)}
    // ]}

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubcontractDetailRoutingModule { }
