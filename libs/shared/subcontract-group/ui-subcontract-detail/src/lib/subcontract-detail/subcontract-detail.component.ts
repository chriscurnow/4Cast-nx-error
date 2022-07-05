import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// TODO: [NX-19] resolve circular dependency



import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SubcontractHeaderComponent } from '../contract-header/contract-header.component';

@Component({
  selector: 'fourcast-subcontract-detail',
  templateUrl: './subcontract-detail.component.html',
  styleUrls: ['./subcontract-detail.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    SubcontractHeaderComponent,
  ],

})
export class SubcontractDetailComponent implements OnInit {
  contractId: string;
  detailForm: FormGroup;

  @Output() navigateBack = new EventEmitter<null>();
  @Output() createItemZero = new EventEmitter<null>();
  @Output() createNewVariation = new EventEmitter<null>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
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
    // const contractUpdate = this.contractItemsService.createItemForApprovedContract(
    //   this._subcontract
    // );

    // this.contractItemsService.saveNewItem(
    //   contractUpdate,
    //   this._subcontract.project ? this._subcontract.project.id as string : '',
    //   this._subcontract.id as string
    // );
  }

  newVariation(): void {
    this.createNewVariation.emit();
  }

  newClaim(): void {
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

