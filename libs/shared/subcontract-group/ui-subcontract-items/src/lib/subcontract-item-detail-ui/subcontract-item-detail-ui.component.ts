/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { SubcontractItem } from '@workspace/shared/data-access-models';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'fourcast-subcontract-item-detail-ui',
  templateUrl: './subcontract-item-detail-ui.component.html',
  styleUrls: ['./subcontract-item-detail-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubcontractItemDetailUiComponent implements OnInit {
  subcontractItem: SubcontractItem | undefined;
  subcontractItemDetailForm: FormGroup;

  @Input() set item(v: SubcontractItem | undefined) {
    this.subcontractItem = v;
    this.subcontractItemDetailForm.reset(v);
  }

  @Output() navigateBack = new EventEmitter<null>();

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
    console.log();
  }
  createForm() {
    this.subcontractItemDetailForm = this.fb.group({
      id: null,
      itemDate: null,
      itemNumber: null,
      title: null,
      details: null,
      description: null,
    });
  }

  clickOk() {
    this.navigateBack.emit();
  }
}
