import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as GlobalActions from './global.actions';
import { GlobalEffects } from './global.effects';

describe('GlobalEffects', () => {
  let actions: Observable<Action>;
  let effects: GlobalEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        GlobalEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(GlobalEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: GlobalActions.init() });

      const expected = hot('-a-|', {
        a: GlobalActions.loadGlobalSuccess({ global: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
