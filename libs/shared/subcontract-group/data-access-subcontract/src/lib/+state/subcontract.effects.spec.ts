import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule, DataPersistence } from '@nrwl/angular';
import { Observable } from 'rxjs';

import * as SubcontractActions from './subcontract.actions';
import { SubcontractEffects } from './subcontract.effects';
import { hot } from 'jasmine-marbles';

describe('SubcontractEffects', () => {
  let actions: Observable<Action>;
  let effects: SubcontractEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        SubcontractEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(SubcontractEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: SubcontractActions.init() });

      const expected = hot('-a-|', {
        a: SubcontractActions.loadSubcontractSuccess({ subcontract: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
