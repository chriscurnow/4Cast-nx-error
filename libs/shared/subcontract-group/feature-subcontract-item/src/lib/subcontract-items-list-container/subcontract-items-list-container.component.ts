import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  SubcontractItemPartialState,
  selectVariationItems,
  loadItemsForSubcontract,
  createNewSubcontractItem,
  selectSubcontractItemId,

  selectCreateComplete,
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
     const subcontractId = params.get('subcontractId');
     const projectId = params.get('projectId');
     this.subcontractId = subcontractId ? subcontractId : '';

     this.projectId = projectId ? projectId : '';
      this.store.dispatch(
        loadItemsForSubcontract({ subcontractId: this.subcontractId as string })
      );
    });
    this.route.queryParamMap.subscribe((queryParams: ParamMap) => {
      console.log('SUBCONTRACT ITEMS LIST queryparams', queryParams);
      const projectId = queryParams.get('projectId');
      this.projectId = projectId? projectId : '';
    })

    // console-log();

  }

  itemSelected(item: SubcontractItem){
    // if ( item !== this.variationItems[0])
    this.router.navigate(['../../detail', item.id], {queryParams: {'projectId': item.projectId}, relativeTo: this.route})
  }

  createVariation(){
  this.router.navigate(['../../detail', 'new'], {queryParamsHandling: 'preserve', relativeTo: this.route });

    // this.store.dispatch(
    //   createNewSubcontractItem({
    //     projectId: this.projectId,
    //     subcontractId: this.subcontractId,
    //   })
    // );

    // this.store.select(selectCreateComplete)
    // .subscribe((res: any) => {
    //   console.log('SUBCONTRACT ITEMS LIST CONTAINER result of selectCreateComplete', res)
    //   // const complete = res.createComplete;
    //   // const id = res.selectedId;
    //   const id = 'new';
    //   if(res){
    //     this.router.navigate(['../../detail', id], { relativeTo: this.route})
    //   }
    // })

    // console-log('CREATE VARIATION');
    // let subscriptionInitialised = false
    // const idSubscription = this.store.select(getSelectedId)
    // .subscribe((id: string) => {
    //   if(subscriptionInitialised && id && id !==''){
    //      this.router.navigate(['../detail', id], { relativeTo: this.route });
    //     idSubscription.unsubscribe();
    //   }

    // })

}
}
