import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subcontract, SubcontractItem } from '@workspace/shared/data-access-models';
import { SubcontractPartialState, loadSubcontractsList, selectSubcontract } from '@workspace/shared/subcontract-group/data-access-subcontract';
import {
  SubcontractItemPartialState,
        selectSubcontractItem,
        loadItemsForSubcontract} from '@workspace/shared/subcontract-group/data-access-subcontract-item';


@Component({
  selector: 'fourcast-subcontract-detail-variation-container',
  templateUrl: './subcontract-detail-variation-container.component.html',
  styleUrls: ['./subcontract-detail-variation-container.component.scss']
})
export class SubcontractDetailVariationContainerComponent implements OnInit {

  subcontractItem: SubcontractItem;

  constructor(private subcontractStore: Store<SubcontractPartialState>,
              private itemsStore: Store<SubcontractItemPartialState>) {

    // this.subcontractStore.select(selectSubcontract)
    // .subscribe((s: Subcontract | undefined) => {
    //   if(s)
    //   { this.subcontractStore.dispatch(loadItemsForSubcontract({subcontract: s as Subcontract}))}
    // })

    // this.itemsStore
    //   .select(selectSubcontractItem)
    //   .subscribe((item: SubcontractItem | undefined) => {
    //     this.subcontractItem = item as SubcontractItem;
    //       'SUBCONTRACT DETAIL VARIATION CONTAINER COMPONENT item selected',
    //       item
    //     );
    //   });

  }

  ngOnInit(): void {

    this.subcontractStore.dispatch(loadSubcontractsList())
  }

}
