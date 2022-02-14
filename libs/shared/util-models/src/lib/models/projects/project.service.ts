// import { Injectable } from '@angular/core';
// import { Project } from './project';


// import { Observable } from 'rxjs';


// @Injectable({
//   providedIn: 'root'
// })
// export class ProjectService extends DataService<Project> {

//   get collectionName(): string { return 'projects'}

//   get collectionPath(): string {
//     return `${this.companyService.collectionName}/${this._companyId}/${this.collectionName}`;
//   }

//   get documentPath(): string {
//     return `${this.collectionPath}/${this._projectId}`;
//   }

//   _companyId!: string;
//   _projectId!: string;

//   constructor(private companyService: CompanyService) {
//     super()
//   }

//   /**
//    *
//    * @param companyId : string
//    * @param projectId : string
//    * @returns
//    */
//   getProject(companyId:string, projectId: string): Observable<Project | undefined> {
//     this._companyId = companyId;
//     this._projectId = projectId;
//     return this.getDocument();
//   }

//   updateProject(project: Project) {
//    this.updateDocument(project)
//   }

//   addProject(companyId: string, project: Project) {
//     this._companyId = companyId;
//     project.company.id = companyId;
//     this.addDocument(project);
//   }
// }
