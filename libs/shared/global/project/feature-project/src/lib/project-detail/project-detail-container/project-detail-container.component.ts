import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { loadProjectList, ProjectPartialState, getSelectedProject,  init, updateProject, getUpdated  } from '@workspace/shared-global-project-data-access-project';
import { Observable, Subscription } from 'rxjs';
import { Project } from '@workspace/shared/data-access-models'; // import model
import { ProjectDetailUiComponent } from '../project-detail-ui/project-detail-ui.component';

@Component({
  selector: 'fourcast-project-detail-container',
  standalone: true,
  imports: [CommonModule, ProjectDetailUiComponent],

  templateUrl: './project-detail-container.component.html',
  styleUrls: ['./project-detail-container.component.css'],
})
export class ProjectDetailContainerComponent implements OnInit, OnDestroy {
  entity$!: Observable<Project | undefined>;
  entity!: Project | undefined;
  isUpdatedSubscription!: Subscription;

  constructor(
    private store: Store<ProjectPartialState>,
    private location: Location
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

  updateEntity(entity: Project) {
    this.store.dispatch(updateProject({ project: entity }));
    const updated$ = this.store.select(getUpdated);
    this.isUpdatedSubscription = updated$.subscribe((updated: boolean | undefined) => {
      if (updated) {
        this.location.back();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.isUpdatedSubscription) {
      this.isUpdatedSubscription.unsubscribe();
    }
  }
}
