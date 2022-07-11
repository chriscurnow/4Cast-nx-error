import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadProjectList, ProjectPartialState, getSelectedProject,  init  } from '@workspace/shared-global-project-data-access-project';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '@workspace/shared/data-access-models'; // import model
import { ProjectDetailUiComponent } from '../project-detail-ui/project-detail-ui.component';

@Component({
  selector: 'fourcast-project-detail-container',
  standalone: true,
  imports: [CommonModule, ProjectDetailUiComponent],

  templateUrl: './project-detail-container.component.html',
  styleUrls: ['./project-detail-container.component.css'],
})
export class ProjectDetailContainerComponent {
  entity$!: Observable<Project | undefined>;
  entity!: Project | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<ProjectPartialState>
  ) {
    this.entity$ = this.store.select(getSelectedProject);

    this.entity$.subscribe((res) => {

      this.entity = res;
    });
  }

  ngOnInit(): void {
    // we want to load the list here so the selector can get the
    // correct entity based on the router.
    this.store.dispatch(init());
  }

  updateEntity(entity: Project | undefined) {
    console.log('update Entity', entity)
  }
}
