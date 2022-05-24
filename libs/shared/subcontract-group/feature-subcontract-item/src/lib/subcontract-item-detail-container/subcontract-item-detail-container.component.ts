import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { SubcontractPartialState, displayItemDetail, hideItemDetail } from '@workspace/shared/subcontract-group/data-access-subcontract';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NavigationService } from '@workspace/shared/util';

@Component({
  selector: 'fourcast-subcontract-item-detail-container',
  templateUrl: './subcontract-item-detail-container.component.html',
  styleUrls: ['./subcontract-item-detail-container.component.scss'],
})
export class SubcontractItemDetailContainerComponent implements OnInit, OnDestroy{
  subcontractItemId$: Observable<string>;
  subcontractItemId: string | undefined;
  subcontractItem$: Observable<SubcontractItem | undefined>;
  subcontractItem: SubcontractItem | undefined;

  constructor(private store: Store<SubcontractItemPartialState>,
              private subcontractStore: Store<SubcontractPartialState>,
              private navigationService: NavigationService
              ) {
    this.subcontractItem$ = this.store.select(selectSubcontractItem);

    this.subcontractItem$.subscribe((item: SubcontractItem | undefined) => {
      console.log(
        'SUBCONTRACT ITEM DETAIL CONTAINER constructor, subcontract item',
        item
      );
      this.subcontractItem = item;
      this.subcontractItemId = item ? item.id : '';
    });
  }


  ngOnInit(): void {
    console.log();
    this.subcontractStore.dispatch(displayItemDetail())
  }

  navigateBack(){
    this.navigationService.back();
  }

  ngOnDestroy(): void {
      this.subcontractStore.dispatch(hideItemDetail())
  }
}
