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
  subcontractItemId: string;
  subcontractItem$: Observable<SubcontractItem | undefined>;
  subcontractItem: SubcontractItem | undefined;

  constructor(private store: Store<SubcontractItemPartialState>) {
this.store.select(selectSubcontractItemId)
.subscribe((id: string) => {
  this.subcontractItemId = id;
  this.store.dispatch(loadSubcontractItem({subcontractItemId: id}))
})

    this.subcontractItem$ = this.store.select(selectSubcontractItem);

    this.subcontractItem$.subscribe((item: SubcontractItem | undefined) => {
      console.log('Result of subcontract item select', item);
      this.subcontractItem = item;
    })
  }

  ngOnInit(): void {
    console.log();
  }
}
