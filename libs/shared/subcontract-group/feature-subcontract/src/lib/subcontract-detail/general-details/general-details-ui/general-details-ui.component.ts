import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Subcontract } from '@workspace/shared/data-access-models';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SubcontractDatesComponent } from '@workspace/shared-subcontract-group-ui-subcontract-detail';

@Component({
  selector: 'fourcast-general-details-ui',
  templateUrl: './general-details-ui.component.html',
  styleUrls: ['./general-details-ui.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SubcontractDatesComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralDetailsUIComponent implements OnInit {
  _subcontract: Subcontract | undefined;
  subcontractId = '';
  detailForm: FormGroup;

  @Input() set subcontract(v: Subcontract | undefined) {
    this._subcontract = v;
    // console-log('GENERAL DETAILS COMPONENT, subcontract', this._subcontract)
    if (this._subcontract) {
      this.subcontractId = this._subcontract.id as string;
    }
    this.detailForm.reset(this._subcontract);
  }

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
    console.log();
  }

  createForm() {
    this.detailForm = this.fb.group({
      id: '',
      name: '',
      dates: new FormControl([]),
      description: '',
    });
  }
}
