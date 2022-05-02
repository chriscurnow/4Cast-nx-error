import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  SubcontractItemPartialState,
  selectAllSubcontractItem,
  createSubcontractItem,
  createVariation,
  SubcontractItemsService,
} from '@workspace/shared/subcontract-group/data-access-subcontract-item';

@Component({
  selector: 'fourcast-subcontract-item-detail-container',
  templateUrl: './subcontract-item-detail-container.component.html',
  styleUrls: ['./subcontract-item-detail-container.component.scss']
})
export class SubcontractItemDetailContainerComponent implements OnInit {

  constructor(private store: Store<SubcontractItemPartialState>) { }

  ngOnInit(): void {
    console.log();
  }

}
