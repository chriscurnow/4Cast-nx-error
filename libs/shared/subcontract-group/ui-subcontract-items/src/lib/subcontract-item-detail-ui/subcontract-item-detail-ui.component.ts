/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { SubcontractItem } from '@workspace/shared/data-access-models';
import { FormGroup, FormBuilder } from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  LuxonDateAdapter,
  MAT_LUXON_DATE_FORMATS,
} from '@angular/material-luxon-adapter';
import { DateUtilsService } from '@workspace/shared/util';


@Component({
  selector: 'fourcast-subcontract-item-detail-ui',
  templateUrl: './subcontract-item-detail-ui.component.html',
  styleUrls: ['./subcontract-item-detail-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-AU' },
    {
      provide: DateAdapter,
      useClass: LuxonDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_LUXON_DATE_FORMATS },
  ],
})
export class SubcontractItemDetailUiComponent implements OnInit {
  subcontractItem: SubcontractItem | undefined;
  subcontractItemDetailForm: FormGroup;
  itemId = '';
  @Input() set item(v: SubcontractItem | undefined) {
    this.subcontractItem = v;
    this.itemId = v ? (v.id as string) : '';
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
