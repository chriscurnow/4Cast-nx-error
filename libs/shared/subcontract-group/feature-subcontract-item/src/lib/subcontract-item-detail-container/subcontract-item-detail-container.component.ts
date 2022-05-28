import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { SubcontractItem } from '@workspace/shared/data-access-models';
import {
  SubcontractItemPartialState,
  selectSubcontractItem,
  loadSubcontractItem,
  updateSubcontractItem,
  selectUpdateComplete,
} from '@workspace/shared/subcontract-group/data-access-subcontract-item';
import { SubcontractPartialState, displayItemDetail, hideItemDetail } from '@workspace/shared/subcontract-group/data-access-subcontract';
import { Observable, Subscription } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CurrencyClass, NavigationService } from '@workspace/shared/util';
import { DateTime } from 'luxon';

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
  projectId: string;
  subcontractId: string;
  updateCompleteSubscription: Subscription;

  constructor(private store: Store<SubcontractItemPartialState>,
              private subcontractStore: Store<SubcontractPartialState>,
              private navigationService: NavigationService,
              private router: Router,
              private route: ActivatedRoute
              ) {
    this.subcontractItem$ = this.store.select(selectSubcontractItem);

    this.subcontractItem$.subscribe((item: SubcontractItem | undefined) => {
      console.log(
        'SUBCONTRACT ITEM DETAIL CONTAINER constructor, subcontract item',
        item
      );
      this.subcontractItem = item;
      this.subcontractItemId = item?.id;
    });
  }


  ngOnInit(): void {
    console.log();
    this.route.paramMap.subscribe((params: ParamMap) => {
      const itemId = params.get('subcontractItemId');
      this.subcontractId = params.get('contractId') as string;
      this.projectId = params.get('projectId') as string;
      console.log('params projectId', this.projectId);
      console.log('params subcontractId', this.subcontractId);
      console.log('params itemId', itemId);
      this.store.dispatch(loadSubcontractItem({
        projectId: this.projectId as string,
        subcontractId: this.subcontractId as string,
        subcontractItemId: itemId as string}))
    })
    this.subcontractStore.dispatch(displayItemDetail())
  }

  saveItem(item: SubcontractItem){
    console.log('SAVE ITEM, value to save', item)
    item.itemDateISO = item.itemDateTime?.toISO();
    item.itemDateTime = null;
    item.projectId = this.projectId;
    item.subcontractId = this.subcontractId;
    this.store.dispatch(updateSubcontractItem({subcontractItem: item}));
    this.updateCompleteSubscription = this.store.select(selectUpdateComplete)
      .subscribe((complete: boolean) => {
        if (complete){
          this.navigateBack();
        }
    })
  }

  navigateBack(){
    console.log('NAVIGATE BACK, route', this.route)
    this.router.navigate(['../../items-list'], {relativeTo: this.route})
    // this.navigationService.back();
  }

  ngOnDestroy(): void {
      this.subcontractStore.dispatch(hideItemDetail())
      if (this.updateCompleteSubscription){
         this.updateCompleteSubscription.unsubscribe();
      }

  }
}
