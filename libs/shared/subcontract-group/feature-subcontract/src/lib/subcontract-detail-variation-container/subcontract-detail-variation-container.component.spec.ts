import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractDetailVariationContainerComponent } from './subcontract-detail-variation-container.component';
import { Store, StoreModule } from '@ngrx/store';

describe('SubcontractDetailVariationContainerComponent', () => {
  let component: SubcontractDetailVariationContainerComponent;
  let fixture: ComponentFixture<SubcontractDetailVariationContainerComponent>;
  let store: Store;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ SubcontractDetailVariationContainerComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractDetailVariationContainerComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
