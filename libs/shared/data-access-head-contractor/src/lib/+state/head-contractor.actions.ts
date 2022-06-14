import { createAction, props } from '@ngrx/store';
import { HeadContractorEntity } from './head-contractor.models';

export const init = createAction('[HeadContractor Page] Init');

export const loadHeadContractorSuccess = createAction(
  '[HeadContractor/API] Load HeadContractor Success',
  props<{ headContractor: HeadContractorEntity[] }>()
);

export const loadHeadContractorFailure = createAction(
  '[HeadContractor/API] Load HeadContractor Failure',
  props<{ error: any }>()
);
