import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as SubcontractItemActions from './subcontract-item.actions';
import { SubcontractItemEffects } from './subcontract-item.effects';

describe('SubcontractItemEffects', () => {
  let actions: Observable<Action>;
  let effects: SubcontractItemEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        SubcontractItemEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(SubcontractItemEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: SubcontractItemActions.init() });

      const expected = hot('-a-|', {
        a: SubcontractItemActions.loadSubcontractItemSuccess({
          subcontractItem: [],
        }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
