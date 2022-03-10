import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// TODO: [NX-19] resolve circular dependency



import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Subcontract } from '@workspace/shared/data-access-models';

@Component({
  selector: 'fourcast-subcontract-detail',
  templateUrl: './subcontract-detail.component.html',
  styleUrls: ['./subcontract-detail.component.scss'],
})
export class SubcontractDetailComponent implements OnInit {

  contractId: string;
  detailForm: FormGroup;
  _subcontract: Subcontract;

  @Input() set subcontract (v: Subcontract | null | undefined){

    console.log('Subcontract Detail Component, set subcontract', v)
    if (v) {
      this._subcontract = v;
      this._subcontract.description = 'Plumbing';
      this.contractId = this._subcontract.id;
    }
    this.detailForm.reset(this._subcontract);
  }


  @Output() navigateBack = new EventEmitter<null>()

  constructor(
    private fb: FormBuilder
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

back(){
  this.navigateBack.emit();
}

}

