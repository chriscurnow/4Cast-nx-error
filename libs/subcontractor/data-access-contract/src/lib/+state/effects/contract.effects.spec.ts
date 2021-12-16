import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as ContractActions from '../actions/contract.actions';
import { ContractEffects } from './contract.effects';

describe('ContractEffects', () => {
  let actions: Observable<Action>;
  let effects: ContractEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        ContractEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(ContractEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ContractActions.init() });

      const expected = hot('-a-|', {
        a: ContractActions.loadContractSuccess({ contract: {id: '0', name: ''} }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
