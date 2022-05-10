import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractItemListComponent } from './subcontract-item-list.component';
import { Store, StoreModule } from '@ngrx/store';

describe('SubcontractItemListComponent', () => {
  let component: SubcontractItemListComponent;
  let fixture: ComponentFixture<SubcontractItemListComponent>;
  let store: Store;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ SubcontractItemListComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractItemListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
