import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as HeadContractorActions from './head-contractor.actions';
import { HeadContractorEffects } from './head-contractor.effects';

describe('HeadContractorEffects', () => {
  let actions: Observable<Action>;
  let effects: HeadContractorEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        HeadContractorEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(HeadContractorEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: HeadContractorActions.init() });

      const expected = hot('-a-|', {
        a: HeadContractorActions.loadHeadContractorSuccess({
          headContractor: [],
        }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
