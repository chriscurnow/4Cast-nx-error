/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SubcontractItem } from '@workspace/shared/data-access-models';
@Component({
  selector: 'fourcast-subcontract-item',
  templateUrl: './subcontract-item.component.html',
  styleUrls: ['./subcontract-item.component.scss'],
})
export class SubcontractItemComponent implements OnInit {
  contractItemForm: UntypedFormGroup;
  localItem: SubcontractItem;
  status: number;
  itemNumber: number;
  projectId: string | null;
  subcontractId: string | null;

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
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

    this.localItem = value;
    this.status = this.localItem.status as number;
    this.itemNumber = this.localItem.itemNumber as number;

    this.contractItemForm.reset(this.localItem);
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idName = 'subcontractId';
      this.subcontractId = params.get(idName);
      this.projectId = params.get('projectId');
    });
  }

  editItem(): void {
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
