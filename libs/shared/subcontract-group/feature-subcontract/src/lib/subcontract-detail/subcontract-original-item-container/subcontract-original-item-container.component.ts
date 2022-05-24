import { Component, OnInit,  Input} from '@angular/core';
import { Store } from '@ngrx/store';
import {

  selectOriginalItem,
  SubcontractItemPartialState,
} from '@workspace/shared/subcontract-group/data-access-subcontract-item';

import {

  SubcontractItem,
} from '@workspace/shared/data-access-models';

@Component({
  selector: 'fourcast-subcontract-original-item-container',
  templateUrl: './subcontract-original-item-container.component.html',
  styleUrls: ['./subcontract-original-item-container.component.scss'],
})
export class SubcontractOriginalItemContainerComponent implements OnInit {
  originalItem: SubcontractItem;


  constructor(private store: Store<SubcontractItemPartialState>) {}

  ngOnInit(): void {

    this.store
      .select(selectOriginalItem)
      .subscribe((items: SubcontractItem[]) => {
        if (items.length > 0) {
          this.originalItem = items[0];
        }
      });


  }
}
