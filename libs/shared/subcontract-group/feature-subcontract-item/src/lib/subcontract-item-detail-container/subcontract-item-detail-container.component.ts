import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SubcontractItem } from '@workspace/shared/data-access-models';
import {
  SubcontractItemPartialState,
  selectAllSubcontractItem,
  selectSubcontractItem,
  createSubcontractItem,
  createVariation,
  SubcontractItemsService,
  selectSubcontractItemId,
  loadSubcontractItem,
} from '@workspace/shared/subcontract-group/data-access-subcontract-item';
import { Observable } from 'rxjs';

@Component({
  selector: 'fourcast-subcontract-item-detail-container',
  templateUrl: './subcontract-item-detail-container.component.html',
  styleUrls: ['./subcontract-item-detail-container.component.scss'],
})
export class SubcontractItemDetailContainerComponent implements OnInit {
  subcontractItemId$: Observable<string>;
  subcontractItemId: string | undefined;
  subcontractItem$: Observable<SubcontractItem | undefined>;
  subcontractItem: SubcontractItem | undefined;

  constructor(private store: Store<SubcontractItemPartialState>) {
    this.subcontractItem$ = this.store.select(selectSubcontractItem);

    this.subcontractItem$.subscribe((item: SubcontractItem | undefined) => {
      console.log('SUBCONTRACT ITEM DETAIL CONTAINER constructor, subcontract item', item )
      this.subcontractItem = item;
      this.subcontractItemId = item ? item.id : '';
    });

  }

  ngOnInit(): void {
   console.log()
  }
}
