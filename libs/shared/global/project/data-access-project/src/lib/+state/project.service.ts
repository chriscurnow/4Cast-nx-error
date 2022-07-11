import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Project } from '@workspace/shared/data-access-models';
import { from, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private afs: AngularFirestore) {}

  getProjectList() {
    console.log('get project list');
    return this.afs
      .collection<Project>('projects')
      .valueChanges()
      .pipe(
        map((projects) => {
          return projects;
        })
      );
  }

  getProject(id: string | null) {
    const path = `projects/${id}`;
    return this.afs
      .doc<Project>(path)
      .valueChanges()
      .pipe(
        map((project) => {
          if (project) {
            return project;
          } else {
            return { id: '' };
          }
        })
      );
  }

  updateProject(project: Project | null) {
    let path = 'projects';
    if (project) {
      if (project.id && project.id !== '') {
        path += `/${project.id}`;
        return from(this.afs.doc<Project>(path).update(project)).pipe(
          map(() => {
            return project;
          })
        );
      } else {
        return from(this.afs.collection<Project>(path).add(project)).pipe(
          map((projectReference) => {
            const id = projectReference.id;
            project.id = id;
            return project;
          })
        );
      }
    } else {
      throw 'project not defined';
    }
  }
}
