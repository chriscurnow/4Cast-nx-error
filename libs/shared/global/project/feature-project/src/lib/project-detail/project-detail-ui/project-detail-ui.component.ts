import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Project } from '@workspace/shared/data-access-models'; // import model


@Component({
  selector: 'fourcast-project-detail-ui',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatInputModule, MatButtonModule, MatFormFieldModule, ReactiveFormsModule],

  templateUrl: './project-detail-ui.component.html',
  styleUrls: ['./project-detail-ui.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectDetailUiComponent  {
  entityId!: string | undefined;
  detailForm!: FormGroup;
  _entity: Project;

@Input() set entity(v: Project | null | undefined) {
  if(v) {
    this._entity = v;
    this.entityId = this._entity.id;
    console.log('PROJECT DETAIL UI on entity input', this.entity)
    this.detailForm.reset(this._entity);
  }
}

 @Output() navigateBack = new EventEmitter<null>();
  @Output() updateEntity = new EventEmitter< Project>();

  constructor(
    private fb: FormBuilder,

  ) {
    this.createForm();
   }

 createForm() {
    this.detailForm = this.fb.group({
      id: null,
      name: [''],
      number: [''],
    });
  }

  update() {
     console.log('PROJECT DETAIL UI, detailForm', this.detailForm);
    this._entity = this.detailForm.value;
    console.log('PROJECT DETAIL UI, update')
    this.updateEntity.emit(this._entity);
  }

  back() {
    this.navigateBack.emit();
  }

}
