import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {  SubcontractItem } from '@workspace/shared/data-access-models';
import { SubcontractPartialState, loadSubcontractsList } from '@workspace/shared/subcontract-group/data-access-subcontract';
import {
  SubcontractItemPartialState,
} from '@workspace/shared/subcontract-group/data-access-subcontract-item';


@Component({
  selector: 'fourcast-subcontract-detail-variation-container',
  templateUrl: './subcontract-detail-variation-container.component.html',
  styleUrls: ['./subcontract-detail-variation-container.component.scss']
})
export class SubcontractDetailVariationContainerComponent implements OnInit {

  subcontractItem: SubcontractItem;

  constructor(private subcontractStore: Store<SubcontractPartialState>,
              private itemsStore: Store<SubcontractItemPartialState>) {
  }

  ngOnInit(): void {

    this.subcontractStore.dispatch(loadSubcontractsList())
  }

}
