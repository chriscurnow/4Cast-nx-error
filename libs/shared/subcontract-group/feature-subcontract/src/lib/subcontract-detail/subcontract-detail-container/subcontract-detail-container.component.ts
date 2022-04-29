import { Component, OnInit } from '@angular/core';
import {
  SubcontractPartialState,
  selectSubcontract,
} from '@workspace/shared/data-access-subcontract';
import { Subcontract, SubcontractItem } from '@workspace/shared/data-access-models';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { loadSubcontractsList } from '@workspace/shared/data-access-subcontract';
import {
  selectAllSubcontractItem,
  createSubcontractItem,
  createVariation,
  SubcontractItemsService,

} from '@workspace/shared/data-access-subcontract-items';



@Component({
  templateUrl: './subcontract-detail-container.component.html',
  styleUrls: ['./subcontract-detail-container.component.scss'],
})
export class SubcontractDetailContainerComponent implements OnInit {
  contract$: Observable<Subcontract | undefined>;
  items$: Observable<SubcontractItem[] | undefined>;
  subcontract: Subcontract | undefined;
  subcontractItems: SubcontractItem[] | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<SubcontractPartialState>,
    private contractItemsService: SubcontractItemsService
  ) {
    console.log('SUBCONTRACT DETAIL CONTAINER COMPONENT constructor')
     this.contract$ = this.store.select(selectSubcontract)

    this.contract$.subscribe(res => {
      console.log('Result of select subcontract', res)
      this.subcontract = res;
      this.items$ = this.store.select(selectAllSubcontractItem);

      this.items$.subscribe((itemResult: SubcontractItem[] | undefined) => {
        this.subcontractItems = itemResult;
      })
    })
}

  ngOnInit(): void {
    this.store.dispatch(loadSubcontractsList());
    console.log('')
  }

createItemZero(){
   const contractUpdate =
     this.contractItemsService.createItemForApprovedContract(this.subcontract as Subcontract, 'ooriginalContract', 0);
   this.store.dispatch(createSubcontractItem({item: contractUpdate}))
}

createNewVariation(){
  this.store.dispatch(createVariation({subcontract: this.subcontract as Subcontract}))
}

  backToList(){
    this.router.navigate(['../../contract-list'])
  }
}

