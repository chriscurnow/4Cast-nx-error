import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractOriginalItemContainerComponent } from './subcontract-original-item-container.component';
import { Store, StoreModule } from '@ngrx/store';

describe('SubcontractOriginalItemContainerComponent', () => {
  let component: SubcontractOriginalItemContainerComponent;
  let fixture: ComponentFixture<SubcontractOriginalItemContainerComponent>;
  let store: Store;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ SubcontractOriginalItemContainerComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractOriginalItemContainerComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
