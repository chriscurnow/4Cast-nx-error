import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadProjectList, ProjectPartialState, getSelectedProject,  init  } from '@workspace/shared/data-access-project';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '@workspace/shared/data-access-models'; // import model


@Component({
  selector: 'app-project-detail-container',
  standalone: true,
  imports: [CommonModule],

  
  templateUrl: './project-detail-container.component.html',
  styleUrls: ['./project-detail-container.component.css']
})
export class ProjectDetailContainerComponent  {
  entity$!: Observable<Project[]>
  entity!: Project[];

  constructor(
     private route: ActivatedRoute,
    private router: Router,
    private store: Store<ProjectPartialState>,

  ) {
    this. entity$ = this.store.select(getSelectedProject);

    this.entity$.subscribe((res) => {
      this.entity = res;

    });
   }

  ngOnInit(): void {
    // we want to load the list here so the selector can get the
    // correct entity based on the router.
    this.store.dispatch( loadProjectList())
  }

  updateEntity(entity: Project) {

  }
}
