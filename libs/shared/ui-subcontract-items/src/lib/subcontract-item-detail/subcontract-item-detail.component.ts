/* eslint-disable @nrwl/nx/enforce-module-boundaries */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { SubcontractItem } from '@workspace/shared/data-access-models';


import { Observable } from 'rxjs';


@Component({
  selector: 'fourcast-subcontract-item',
  templateUrl: './subcontract-item-detail.component.html',
  styleUrls: ['./subcontract-item-detail.component.scss'],
})
export class SubcontractItemDetailComponent implements OnInit {
  contractItemForm: FormGroup;
  localItem: SubcontractItem;
  status: number;
  itemNumber: number;
  projectId: string | null;
  subcontractId: string | null;
  items$: Observable<SubcontractItem[]>

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,

  ) {

    // this.items$ = this.store.select(selectItemsForSubcontract);
    // this.items$.subscribe(items => {
    //   console.log(items)
    // })
    this.contractItemForm = this.fb.group({
      itemNumber: [],
      contractAmount: [],
      title: [],
      approvedToDate: [],
      approvedPercent: [],
      claimedToDate: [],
      claimedPercent: [],
      amountRemaining: [],
    });
  }

  @Input() set item(value: SubcontractItem) {
    console.log('CONTRACT ITEM COMPONENT, set item - value', value);

    this.localItem = value;
    this.status = this.localItem.status as number;
    this.itemNumber = this.localItem.itemNumber as number;

    this.contractItemForm.reset(this.localItem);
  }
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {


    // this.store.dispatch(loadItemsForSubcontract());
    // this.route.paramMap.subscribe((params) => {
    //   console.log('Params', params);
    //   const idName = 'subcontractId';
    //   this.subcontractId = params.get(idName);
    //   this.projectId = params.get('projectId');
    // });
  }

  editItem(): void {
    console.log('Edit item', this.localItem);
    // TODO: Implement following line once we fix 'routeToItem'
    // this.routeToItem(this.localItem);
    // const variationId = this.localItem.id;
    // // const subcontractId = this.localItem ;
    // const subcontractId = this.localItem.subcontractId;
    // this.dialog.open(VariationsDetailComponent,
    //   {data:
    //     {
    //       variationId,
    //       subcontractId
    //     },
    //     disableClose: true
    //   });
  }

  // TODO: [NX-54] Implement 'routeToItem' function
  // routeToItem(item: ContractItem) {
  //   this.router.navigate([
  //     'projects',
  //     this.projectId,
  //     'subcontracts',
  //     this.subcontractId,
  //     item.id,
  //   ]);
  // }
}
