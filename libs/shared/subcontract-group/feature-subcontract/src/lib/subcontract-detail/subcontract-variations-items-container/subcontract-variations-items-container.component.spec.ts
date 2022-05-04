import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractVariationsItemsContainerComponent } from './subcontract-variations-items-container.component';
import { Store, StoreModule } from '@ngrx/store';

describe('SubcontractVariationsItemsContainerComponent', () => {
  let component: SubcontractVariationsItemsContainerComponent;
  let fixture: ComponentFixture<SubcontractVariationsItemsContainerComponent>;
  let store: Store;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ SubcontractVariationsItemsContainerComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractVariationsItemsContainerComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
