import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectOriginalItem,
  selectVariationItems,
  SubcontractItemPartialState,
} from '@workspace/shared/subcontract-group/data-access-subcontract-item';

import {
  Subcontract,
  SubcontractItem,
} from '@workspace/shared/data-access-models';

@Component({
  selector: 'fourcast-subcontract-items',
  templateUrl: './subcontract-items.component.html',
  styleUrls: ['./subcontract-items.component.scss'],
})
export class SubcontractItemsComponent implements OnInit {
  variations: SubcontractItem[];
  originalItem: SubcontractItem | null;

  @Input() set subcontract(v: Subcontract | null | undefined) {
    // if (v) {

    // }
  }

  constructor(private store: Store<SubcontractItemPartialState>) {}

  ngOnInit(): void {
    this.store
      .select(selectOriginalItem)
      .subscribe((items: SubcontractItem[]) => {
        if (items.length > 0) {
          this.originalItem = items[0];
        } else {
          this.originalItem = null;
        }
      });

    this.store
      .select(selectVariationItems)
      .subscribe((variations: SubcontractItem[]) => {
        this.variations = variations;
      });
  }
}
