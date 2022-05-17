import { Component, OnInit, AfterViewInit} from '@angular/core';

import { Subcontract, SubcontractItem } from '@workspace/shared/data-access-models';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  SubcontractPartialState,
  selectSubcontract,
  selectItemDetailDisplayed,
  loadSubcontractsList,
} from '@workspace/shared/subcontract-group/data-access-subcontract';
import {

  createSubcontractItem,
  createVariation,
  SubcontractItemsService,
  SubcontractItemPartialState

} from '@workspace/shared/subcontract-group/data-access-subcontract-item';
import { delay, startWith } from 'rxjs/operators';



@Component({
  templateUrl: './subcontract-detail-container.component.html',
  styleUrls: ['./subcontract-detail-container.component.scss'],
})
export class SubcontractDetailContainerComponent
  implements OnInit, AfterViewInit
{
  contract$: Observable<Subcontract | undefined>;
  items$: Observable<SubcontractItem[] | undefined>;
  subcontract: Subcontract | undefined | null;
  subcontractItems: SubcontractItem[] | undefined;
  itemDetailDisplayed: boolean | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<SubcontractPartialState>,
    private itemsStore: Store<SubcontractItemPartialState>,
    private contractItemsService: SubcontractItemsService
  ) {
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

  ngAfterViewInit() {
    this.store
      .select(selectItemDetailDisplayed)
      .pipe(startWith(undefined), delay(0))
      .subscribe((displayed: boolean | undefined) => {
        this.itemDetailDisplayed = displayed;
      });
  }

  // ngAfterViewInit() {
  //   this.store
  //     .select(selectItemDetailDisplayed)
  //     .pipe(
  //       startWith(undefined),
  //       delay(0)
  //     )
  //     .subscribe((displayed: boolean | undefined) => {
  //       console.log('Item detail displayed', displayed);
  //       this.itemDetailDisplayed = displayed;
  //     });
  // }

  createItemZero() {
    const contractUpdate =
      this.contractItemsService.createItemForApprovedContract(
        this.subcontract as Subcontract,
        'ooriginalContract',
        0
      );
    this.store.dispatch(createSubcontractItem({ item: contractUpdate }));
  }

  createNewVariation() {
    this.store.dispatch(
      createVariation({ subcontract: this.subcontract as Subcontract })
    );
  }

  backToList() {
    this.router.navigate(['../../contract-list']);
  }
}

