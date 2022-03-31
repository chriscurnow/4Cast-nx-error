import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// TODO: [NX-19] resolve circular dependency



import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Subcontract, SubcontractItem } from '@workspace/shared/data-access-models';
import { SubcontractItemsService } from '@workspace/shared/data-access-subcontract-items';


@Component({
  selector: 'fourcast-subcontract-detail',
  templateUrl: './subcontract-detail.component.html',
  styleUrls: ['./subcontract-detail.component.scss'],
})
export class SubcontractDetailComponent implements OnInit {
  contractId: string;
  detailForm: FormGroup;
  _subcontract: Subcontract = {};
  _items: SubcontractItem[] | undefined;
  item0: SubcontractItem = {};

  @Input() set subcontract(v: Subcontract | null | undefined) {
    console.log('Subcontract Detail Component, set subcontract', v);
    if (v) {
      this._subcontract = v;
      this._subcontract.description = 'Plumbing';
      this.contractId = this._subcontract.id ? this._subcontract.id : '';
    }
    this.detailForm.reset(this._subcontract);
  }

  @Input() set items(v: SubcontractItem[] | undefined ) {
    this._items = v;
    if(this._items && this._items.length > 0 ){
      this.item0 = this._items[0];
    } else {
      this.item0 = {};
    }
  }

  @Output() navigateBack = new EventEmitter<null>();
  @Output() createItemZero = new EventEmitter<null>();

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private contractItemsService: SubcontractItemsService) {
    this.createForm();
  }

  ngOnInit() {
    console.log();
  }

  createForm() {
    this.detailForm = this.fb.group({
      id: null,
      name: null,
      dates: new FormControl([]),
      description: null,
    });
  }

  createItemZeroForContract(): void {
    this.createItemZero.emit();
    // console.log('Creating item for contract');
    // const contractUpdate = this.contractItemsService.createItemForApprovedContract(
    //   this._subcontract
    // );

    // this.contractItemsService.saveNewItem(
    //   contractUpdate,
    //   this._subcontract.project ? this._subcontract.project.id as string : '',
    //   this._subcontract.id as string
    // );
  }

  newClaim(): void {
    // console.log(`${this.logText('new claim clicked')}`);
    // this.paymentCreateService
    //   .createSubcontractPayment(this.detail)
    //   .then((paymentId) => {
    //     this.router.navigate(['claims/edit', paymentId]);
    //   });
  }

  onSubmit(): void {
    this.router.navigate(['../../list'], { relativeTo: this.route });

    // just now, there is nothing to save from this form
    // this.subcontractService.saveForm(this.subcontract, this.subcontractForm.value)
  }

  back() {
    this.navigateBack.emit();
  }
}

