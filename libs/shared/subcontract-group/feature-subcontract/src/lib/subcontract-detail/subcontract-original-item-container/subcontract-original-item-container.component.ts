import { Component, OnInit,  Input} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  loadItemsForSubcontract,
  selectOriginalItem,
  SubcontractItemPartialState,
} from '@workspace/shared/subcontract-group/data-access-subcontract-item';

import {
  Subcontract,
  SubcontractItem,
} from '@workspace/shared/data-access-models';

@Component({
  selector: 'fourcast-subcontract-original-item-container',
  templateUrl: './subcontract-original-item-container.component.html',
  styleUrls: ['./subcontract-original-item-container.component.scss'],
})
export class SubcontractOriginalItemContainerComponent implements OnInit {
  originalItem: SubcontractItem;

// As this component is always called by a subcontract detail component,
// I think perhaps we don't need to call loadItemsForSubcontract here
// it will already have been called.

  // @Input() set subcontract(v: Subcontract | null | undefined) {
  //   if (v) {
  //       'SUBCONTRACT ITEMS CONTAINER COMPONENT, input subcontract',
  //       v
  //     );
  //     this.store.dispatch(loadItemsForSubcontract({ subcontract: v }));
  //   }
  // }
  constructor(private store: Store<SubcontractItemPartialState>) {}

  ngOnInit(): void {
    //  this.store.dispatch(loadItemsForSubcontract({ subcontract: {} }));
    this.store
      .select(selectOriginalItem)
      .subscribe((items: SubcontractItem[]) => {
        if (items.length > 0) {
          this.originalItem = items[0];
        }
      });


  }
}
