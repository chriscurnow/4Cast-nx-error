import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Subcontract } from '@workspace/shared/data-access-models';

@Component({
  selector: 'fourcast-contract-general-detail',
  templateUrl: './contract-general-detail.component.html',
  styleUrls: ['./contract-general-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContractGeneralDetailComponent implements OnInit {
  _subcontract: Subcontract | undefined;
  subcontractId = '';
  detailForm: FormGroup;

  @Input() set subcontract(v: Subcontract | undefined) {
    this._subcontract = v;
    if (this._subcontract) {
      this.subcontractId = this._subcontract.id as string;
    }
    this.detailForm.reset(this._subcontract);
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
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
}
