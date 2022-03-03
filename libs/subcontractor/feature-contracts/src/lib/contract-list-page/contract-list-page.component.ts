import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subcontract } from '@workspace/shared/data-access-models';
import { loadSubcontractsList } from '@workspace/shared/data-access-subcontract';
import { Observable } from 'rxjs';


// export const selectAllContracts = createSelector(selectContractState, (state: State) =>

import { selectAllSubcontracts } from '@workspace/shared/data-access-subcontract';

import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'fourcast-contract-list-page',
  templateUrl: './contract-list-page.component.html',
  styleUrls: ['./contract-list-page.component.scss'],
})
export class ContractListPageComponent implements OnInit {
  contracts$: Observable<Subcontract[]>;

  public filteredSubcontracts: Subcontract[];
  public subcontracts: Subcontract[];
  public subcontractorId: string;
  // public subcontractor: SupplierInterface;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // console.log('About to call selectAllContracts')
    this.contracts$ = store.select(selectAllSubcontracts);
    this.contracts$.subscribe((res) => {
      this.filteredSubcontracts = res;
      this.subcontracts = res;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadSubcontractsList());
  }


  rowSelected(subcontract: Subcontract) {
    console.log('Row selected', subcontract);
    this.router.navigate(['../contract-detail', subcontract.id], {relativeTo: this.route})
  }
}
