
import { Superintendent } from './superintendent';
import { ProjectDates } from './project-dates';


import { Company } from '..';




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


