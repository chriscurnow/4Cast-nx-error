import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  SubcontractItemPartialState,
  selectVariationItems,
} from '@workspace/shared/subcontract-group/data-access-subcontract-item';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SubcontractItem } from '@workspace/shared/data-access-models';

@Component({
  selector: 'fourcast-subcontract-items-list-container',
  templateUrl: './subcontract-items-list-container.component.html',
  styleUrls: ['./subcontract-items-list-container.component.scss'],
})
export class SubcontractItemsListContainerComponent implements OnInit {
  variationItems: SubcontractItem[];
  constructor(
    private store: Store<SubcontractItemPartialState>,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.store.select(selectVariationItems)
    .subscribe((items: SubcontractItem[]) => {
      this.variationItems = items;
    })
  }

  ngOnInit(): void {
    console.log();

  }

  itemSelected(item: SubcontractItem){
    if ( item !== this.variationItems[0])
    this.router.navigate(['../detail', item.id], {relativeTo: this.route})
  }

  createVariation(){
    console.log();
  }
}
