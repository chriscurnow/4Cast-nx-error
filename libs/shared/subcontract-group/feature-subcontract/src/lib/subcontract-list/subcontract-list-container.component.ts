import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subcontract } from '@workspace/shared/data-access-models';
import { loadSubcontractsList } from '@workspace/shared/data-access-subcontract';
import { Observable } from 'rxjs';
import {
  SubcontractPartialState,
  selectAllSubcontracts,
} from '@workspace/shared/data-access-subcontract';


import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'fourcast-contract-list-page',
  templateUrl: './subcontract-list-container.component.html',
  styleUrls: ['./subcontract-list-container.component.scss'],
})
export class SubcontractListContainerComponent implements OnInit {
  contracts$: Observable<Subcontract[]>;

  public filteredSubcontracts: Subcontract[];
  public subcontracts: Subcontract[];
  public subcontractorId: string;
  // public subcontractor: SupplierInterface;

  constructor(
    private store: Store<SubcontractPartialState>,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.contracts$ = this.store.select(selectAllSubcontracts);
    this.contracts$.subscribe((res) => {
      this.filteredSubcontracts = res;
      this.subcontracts = res;
    });

  }

  ngOnInit(): void {

    this.loadSubcontracts();
    // console.log('ngOnInit')
  }

  loadSubcontracts(){
    // console.log('CONTRACTS LIST dispatch load subcontracts list action')
    this.store.dispatch(loadSubcontractsList());
  }
  rowSelected(subcontract: Subcontract) {
    console.log('SUBCONTRACT LIST COMPONENT Row selected', subcontract);
    this.router.navigate(['../contract-detail', subcontract.id], {relativeTo: this.route})
  }
}
