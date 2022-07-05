import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Company } from '@workspace/shared/data-access-models'; // import model

@Component({
  selector: 'fourcast-company-detail-ui',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],

  templateUrl: './company-detail-ui.component.html',
  styleUrls: ['./company-detail-ui.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyDetailUiComponent {
  entityId!: string | undefined;
  detailForm!: FormGroup;
  _entity: Company;

  @Input() set entity(v: Company | null | undefined) {
    if (v) {
      this._entity = v;
      this.entityId = this._entity.id;
      this.detailForm.reset(this._entity);
    }
  }

  @Output() navigateBack = new EventEmitter<null>();
  @Output() updateEntity = new EventEmitter<Company>();

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.detailForm = this.fb.group({
      id: [''],
      companyName: [''],
      abn: [''],
      mainOffice: this.fb.group({
        address: this.fb.group({
          line1: [''],
          line2: [''],
          city: [''],
          state: [''],
          postcode: [''],
        }),
        phone: [''],
        email: [''],
      }),
    });
  }

  update() {
    this._entity = this.detailForm.value;
    this.updateEntity.emit(this._entity);
  }

  back() {
    this.navigateBack.emit();
  }
}
