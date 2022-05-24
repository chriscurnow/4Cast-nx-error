import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectVariationItems,
  SubcontractItemPartialState,
} from '@workspace/shared/subcontract-group/data-access-subcontract-item';

import {
  SubcontractItem,
} from '@workspace/shared/data-access-models';

@Component({
  selector: 'fourcast-subcontract-variations-items-container',
  templateUrl: './subcontract-variations-items-container.component.html',
  styleUrls: ['./subcontract-variations-items-container.component.scss'],
})
export class SubcontractVariationsItemsContainerComponent implements OnInit {
  variations: SubcontractItem[];
  constructor(private store: Store<SubcontractItemPartialState>) {}

  ngOnInit(): void {


    this.store
      .select(selectVariationItems)
      .subscribe((variations: SubcontractItem[]) => {
        this.variations = variations;
        console.log('Variations', variations)
      });
  }
}
