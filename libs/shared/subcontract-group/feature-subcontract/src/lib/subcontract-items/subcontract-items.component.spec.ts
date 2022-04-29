import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractItemsComponent } from './subcontract-items.component';
import { Store, StoreModule } from '@ngrx/store';

describe('SubcontractItemsComponent', () => {
  let component: SubcontractItemsComponent;
  let fixture: ComponentFixture<SubcontractItemsComponent>;
  let store: Store;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ SubcontractItemsComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractItemsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
