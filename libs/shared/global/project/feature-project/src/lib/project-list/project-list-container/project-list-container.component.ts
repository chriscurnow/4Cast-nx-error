import { CommonModule,  } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { loadProjectList, ProjectPartialState, getAllProjects, init  } from '@workspace/shared-global-project-data-access-project';
import { addEntity, NavigationPartialState, getAddEntity, showAddButton, addEntitySuccess } from '@workspace/shared/data-access-navigation';
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
    private store: Store<ProjectPartialState>,
    private navStore: Store<NavigationPartialState>
  ) {
    this.entities$ = this.store.select(getAllProjects);
    this.entitiesSubscription = this.entities$.subscribe((res) => {
      this.entities = res;
    });

    this.navStore.select(getAddEntity)
    .subscribe((res) => {
      if(res){
        console.log('Got message add entity');
        this.createNew();
        this.navStore.dispatch(addEntitySuccess());
      }
    })
  }

  ngOnInit(): void {
    this.store.dispatch(init());
    this.navStore.dispatch(showAddButton());
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
