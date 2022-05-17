import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  SubcontractItemPartialState,
  loadItemsForSubcontract,
} from '@workspace/shared/subcontract-group/data-access-subcontract-item';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


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

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    //

  }
}
