import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as SupplierActions from './supplier.actions';
import { SupplierEffects } from './supplier.effects';

describe('SupplierEffects', () => {
  let actions: Observable<Action>;
  let effects: SupplierEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        SupplierEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(SupplierEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: SupplierActions.init() });

      const expected = hot('-a-|', {
        a: SupplierActions.loadSupplierSuccess({ supplier: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
