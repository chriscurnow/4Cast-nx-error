import {
  Component,
  OnInit,
  Input,
} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
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
  items: SubcontractItem[];
  originalItem: SubcontractItem;
  subcontractId: string;

  @Input() set subcontract(v: Subcontract | null | undefined) {
    console.log();
  }

  constructor(private store: Store<SubcontractItemPartialState>,
              private route: ActivatedRoute) {}

  ngOnInit(): void {

    // this.store
    //   .select(selectOriginalItem)
    //   .subscribe((items: SubcontractItem[]) => {
    //     if (items.length > 0) {
    //       this.originalItem = items[0];
    //     }
    //   });

    this.store
      .select(selectVariationItems)
      .subscribe((items: SubcontractItem[]) => {
        console.log('SUBCONTRACT ITEMS CONTAINER subscription to items', items)
        this.items = items;
      });

      this.route.paramMap.subscribe((params: ParamMap) => {
        this.subcontractId = params.get('subcontractId') as string;
        this.store.dispatch(loadItemsForSubcontract({subcontractId: this.subcontractId}))
      });
  }
}
