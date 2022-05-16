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
  detailForm: FormGroup;

  @Input() set item(v: SubcontractItem | undefined) {
    this.subcontractItem = v;
  }



  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    console.log();

  }
  createForm() {
    this.detailForm = this.fb.group({
      id: null,
      title: null,
      details: null,
      description: null,
    });
  }
}
