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
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const id = params.get('contractId');
          console.log('Id from Params', id);
          return of(id);
        })
      )
      .subscribe((contractId: string | null) => {
        this.store.dispatch(
          loadItemsForSubcontract({ subcontractId: contractId as string })
        );
      });
  }

  itemSelected(id: string){
    this.router.navigate(['../detail', id], {relativeTo: this.route})
  }
}
