import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  SubcontractItemPartialState,
  selectVariationItems,
  loadItemsForSubcontract,
  createNewSubcontractItem,
  selectSubcontractItemId,
  getSelectedId,
} from '@workspace/shared/subcontract-group/data-access-subcontract-item';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SubcontractItem } from '@workspace/shared/data-access-models';

@Component({
  selector: 'fourcast-subcontract-items-list',
  templateUrl: './subcontract-items-list-container.component.html',
  styleUrls: ['./subcontract-items-list-container.component.scss'],
})
export class SubcontractItemsListContainerComponent implements OnInit {
  variationItems: SubcontractItem[];
  subcontractId = '';
  projectId = '';
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
    this.route.paramMap.subscribe((params: ParamMap) => {
     const contractId = params.get('contractId');
     const projectId = params.get('projectId');
     this.subcontractId = contractId ? contractId : '';
     this.projectId = projectId ? projectId : '';
      this.store.dispatch(
        loadItemsForSubcontract({ subcontractId: this.subcontractId as string })
      );
    });
    console.log();

  }

  itemSelected(item: SubcontractItem){
    if ( item !== this.variationItems[0])
    this.router.navigate(['../detail', item.id], {relativeTo: this.route})
  }

  createVariation(){
    console.log('CREATE VARIATION');
    let subscriptionInitialised = false
    const idSubscription = this.store.select(getSelectedId)
    .subscribe((id: string) => {
      if(subscriptionInitialised && id && id !==''){
         this.router.navigate(['../detail', id], { relativeTo: this.route });
        idSubscription.unsubscribe();
      }

    })
    subscriptionInitialised = true;
    this.store.dispatch(createNewSubcontractItem({projectId: this.projectId, subcontractId: this.subcontractId}))
  }
}
