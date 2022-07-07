import { CommonModule,  } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadProjectList, ProjectPartialState, getAllProject, init  } from 'libs/shared/global/project/data-access-project/src';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Project } from '@workspace/shared/data-access-models'; // import model


@Component({
  selector: 'fourcast-project-list-container',
  standalone: true,
  imports: [CommonModule],


  templateUrl: './project-list-container.component.html',
  styleUrls: ['./project-list-container.component.css']
})
export class ProjectComponent  {
  entities$!: Observable<Project[]>
  entities!: Project[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<ProjectPartialState>,

  ) {
    this.entities$ = this.store.select(getSelectedProjects)
    this.entities$.subscribe((res) => {
       this.entities = res;

    }
   )
   }

  ngOnInit(): void {
    this.store.dispatch(init())
  }

rowSelected(entity: Project) {

    this.router.navigate(['../detail', entity.id], {
      relativeTo: this.route,
    });
  }
}
