import { setValues } from "@workspace/shared/util";

export interface ProjectDates {
  adjusted?: Date;
  finish?: Date;
  forecastFinish?: Date;
  start?: Date;
}

export function createProjectDates (projectDates: ProjectDates | undefined ): ProjectDates {
  const newProjectDates: ProjectDates = {};
  if (projectDates) {
    const properties = ['adjusted', 'finish', 'forecastFinish', 'start'];
    setValues(projectDates, newProjectDates, properties);
  }
  return newProjectDates;

}


