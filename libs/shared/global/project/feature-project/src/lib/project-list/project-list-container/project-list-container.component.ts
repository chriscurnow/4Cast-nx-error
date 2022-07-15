import { CommonModule,  } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { loadProjectList, ProjectPartialState, getAllProjects, init  } from '@workspace/shared-global-project-data-access-project';
import { Observable, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Project } from '@workspace/shared/data-access-models'; // import model
import { ProjectListUiComponent } from '../project-list-ui/project-list-ui.component';

@Component({
  selector: 'fourcast-project-list-container',
  standalone: true,
  imports: [CommonModule, ProjectListUiComponent],

  templateUrl: './project-list-container.component.html',
  styleUrls: ['./project-list-container.component.css'],
})
export class ProjectListContainerComponent implements OnInit, OnDestroy {
  entities$!: Observable<Project[]>;
  entities!: Project[];
  entitiesSubscription!: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<ProjectPartialState>
  ) {
    this.entities$ = this.store.select(getAllProjects);
    this.entitiesSubscription = this.entities$.subscribe((res) => {
      this.entities = res;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(init());
  }

  rowSelected(entity: Project) {
    this.router.navigate(['../detail', entity.id], {
      relativeTo: this.route,
    });
  }

  ngOnDestroy(): void {
    if (this.entitiesSubscription) {
      this.entitiesSubscription.unsubscribe();
    }
  }

  createNew() {
    this.router.navigate(['../detail', 'new'], {
      relativeTo: this.route,
    });
  }
}
