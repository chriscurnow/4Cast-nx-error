import {
  Component,
  OnInit,
  Input,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  loadItemsForSubcontract,
  selectOriginalItem,
  selectVariationItems,
  SubcontractItemPartialState,
} from '@workspace/shared/subcontract-group/data-access-subcontract-item';

import {
  Subcontract,
  SubcontractItem,
} from '@workspace/shared/data-access-models';

@Component({
  selector: 'fourcast-subcontract-items-container',
  templateUrl: './subcontract-items-container.component.html',
  styleUrls: [
    './subcontract-items-container.component.scss',
    './subcontract-detail.scss',
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubcontractItemsContainerComponent implements OnInit {
  variations: SubcontractItem[];
  originalItem: SubcontractItem;

  @Input() set subcontract(v: Subcontract | null | undefined) {
    if (v) {

      this.store.dispatch(loadItemsForSubcontract({ subcontract: v }));
    }
  }

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

    this.store
      .select(selectVariationItems)
      .subscribe((variations: SubcontractItem[]) => {
        this.variations = variations;
      });
  }
}
