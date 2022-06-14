import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
       {path: '', pathMatch: 'full', redirectTo: 'list'} ,
       {path: 'list'},
       { path: 'detail/:projectId',
        children: [
          { path: 'subcontracts',
            loadChildren: () =>

                // eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
                import(
                  '@workspace/shared/subcontract-group/feature-subcontract'
                ).then(
                  (module) =>
                    module.SharedSubcontractGroupFeatureSubcontractModule
                )
            }
        ]}
    ]),
  ],
})
export class SharedFeatureProjectsModule {}
