import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  Subcontract
} from '@workspace/shared/data-access-models';
import {
  SubcontractPartialState,
  selectSubcontract,
  loadSubcontractsList,
} from '@workspace/shared/subcontract-group/data-access-subcontract';
import { Observable } from 'rxjs';


@Component({
  selector: 'fourcast-contract-general-detail-container',
  templateUrl: './contract-general-detail-container.component.html',
  styleUrls: ['./contract-general-detail-container.component.scss'],
})
export class ContractGeneralDetailContainerComponent implements OnInit {
  contract$: Observable<Subcontract | undefined>;
  subcontract: Subcontract | undefined;

  constructor(private store: Store<SubcontractPartialState>) {
    this.contract$ = this.store.select(selectSubcontract);

    this.contract$.subscribe((res) => {
      this.subcontract = res;
    });
  }

  ngOnInit(): void {
    // after we've loaded the subcontract list, selectSubcontract will select the entity we want
    // using the router selecter.
    this.store.dispatch(loadSubcontractsList());
  }
}
