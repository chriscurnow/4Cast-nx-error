import moment from 'moment';

export interface ContractDates {
  completedOnSite?: Date | moment.Moment | null | undefined;
  commencement?: Date | moment.Moment | null | undefined;
  completion?: Date | moment.Moment | null | undefined;
  contract?: Date | moment.Moment | null | undefined;
}
