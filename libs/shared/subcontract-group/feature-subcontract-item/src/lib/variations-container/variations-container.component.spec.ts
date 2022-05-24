import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariationsContainerComponent } from './variations-container.component';
import { Store, StoreModule } from '@ngrx/store';

describe('VariationsContainerComponent', () => {
  let component: VariationsContainerComponent;
  let fixture: ComponentFixture<VariationsContainerComponent>;
  let store: Store;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ VariationsContainerComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariationsContainerComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
