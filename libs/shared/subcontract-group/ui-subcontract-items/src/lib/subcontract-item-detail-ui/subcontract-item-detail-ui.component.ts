/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { SubcontractItem } from '@workspace/shared/data-access-models';
import { UntypedFormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from '@angular/material/core';
import {
  LuxonDateAdapter,
  MAT_LUXON_DATE_FORMATS,
} from '@angular/material-luxon-adapter';
import { DateUtilsService } from '@workspace/shared/util';
import { DateTime } from 'luxon';


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
export class SubcontractItemDetailUiComponent  {
  subcontractItem: SubcontractItem | undefined;
  subcontractItemDetailForm: UntypedFormGroup;
  itemId = '';
  @Input() set item(v: SubcontractItem | undefined) {
    this.subcontractItem = v;
    if(v){
      this.itemId = v.id as string;
      if(v.itemDateISO){
         v.itemDateTime = DateTime.fromISO(v.itemDateISO);
      }


    }
    // console-log('Subcontract Item', v)
    this.subcontractItemDetailForm.reset(v);
  }

  @Output() saveItem = new EventEmitter<SubcontractItem>();
  @Output() navigateBack = new EventEmitter<null>();

  constructor(private fb: FormBuilder) {
    this.createForm();
  }


  createForm() {
    this.subcontractItemDetailForm = this.fb.group({
      id: '',
      itemDateTime: [null, Validators.required],
      itemNumber: null,
      title: [null, Validators.required],
      details: '',
      description: '',
      contractAmount: [null, Validators.required]
    });
  }

  clickOk() {
   const formValue = this.subcontractItemDetailForm.value;
   this.saveItem.emit(formValue);
  }
  clickCancel() {
     this.navigateBack.emit();
  }
}
