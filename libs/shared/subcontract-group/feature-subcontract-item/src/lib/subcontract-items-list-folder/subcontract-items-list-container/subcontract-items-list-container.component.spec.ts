import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractItemsListContainerComponent } from './subcontract-items-list-container.component';
import { Store, StoreModule } from '@ngrx/store';

describe('SubcontractItemsListContainerComponent', () => {
  let component: SubcontractItemsListContainerComponent;
  let fixture: ComponentFixture<SubcontractItemsListContainerComponent>;
  let store: Store;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ SubcontractItemsListContainerComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractItemsListContainerComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
