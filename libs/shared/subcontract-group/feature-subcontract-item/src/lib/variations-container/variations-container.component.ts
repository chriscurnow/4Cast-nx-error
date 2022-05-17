import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  SubcontractItemPartialState,
  loadSubcontractItems,
  selectVariationItems,
  loadItemsForSubcontract,
  subcontractItemAdapter,
} from '@workspace/shared/subcontract-group/data-access-subcontract-item';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SubcontractItem } from '@workspace/shared/data-access-models';

@Component({
  selector: 'fourcast-variations-container',
  templateUrl: './variations-container.component.html',
  styleUrls: ['./variations-container.component.scss'],
})
export class VariationsContainerComponent implements OnInit {
  constructor(
    private store: Store<SubcontractItemPartialState>,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // this.store
    //   .select(selectVariationItems)
    //   .subscribe((items: SubcontractItem[]) => {
    //     this.variationItems = items;
    //   });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
       const id = params.get('contractId');
       console.log('VARIATIONS CONTAINER COMPONENT contractId from params', id)
        this.store.dispatch(
          loadItemsForSubcontract({ subcontractId: id as string })
        );
    })

  }
}
