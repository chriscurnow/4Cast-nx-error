import { Component, OnInit } from '@angular/core';
import { Component, OnDestroy, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  NG_VALIDATORS,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';

@Component({
  selector: 'fourcast-contract-dates',
  templateUrl: './contract-dates.component.html',
  styleUrls: ['./contract-dates.component.scss']
})
export class ContractDatesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
