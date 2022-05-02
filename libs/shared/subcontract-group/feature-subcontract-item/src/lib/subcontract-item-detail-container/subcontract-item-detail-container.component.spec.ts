import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractItemDetailContainerComponent } from './subcontract-item-detail-container.component';
import { Store, StoreModule } from '@ngrx/store';

describe('SubcontractItemDetailContainerComponent', () => {
  let component: SubcontractItemDetailContainerComponent;
  let fixture: ComponentFixture<SubcontractItemDetailContainerComponent>;
  let store: Store;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ SubcontractItemDetailContainerComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractItemDetailContainerComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
