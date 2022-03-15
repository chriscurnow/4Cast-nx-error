
import { Superintendent } from './superintendent';
import { ProjectDates } from './project-dates';


import { Company, createCompany } from '..';
import { setTypeValues } from '@workspace/shared/util';
import { createSuperintendant } from '.';




export interface Project {

  id?: string | undefined;
  number?: string | undefined;
  name?: string | undefined;
  numberName?: string | undefined;
  company?: Company;
  isNew?: boolean | undefined;
  clientName?: string | undefined;
  superintendent?: Superintendent | undefined;
  dates?: ProjectDates | undefined;

}

export function createProject(project: Project | undefined): Project {
  const newProject: Project = {};
  if(project){
    const properties = [
      'id',
      'number',
      'name',
      'numberName',
      'isNew',
      'clientName'
    ];
    setTypeValues(project, newProject, properties);
    newProject.company = createCompany(project.company );
    newProject.superintendent = createSuperintendant(project.superintendent);

  }


  return newProject;
}

