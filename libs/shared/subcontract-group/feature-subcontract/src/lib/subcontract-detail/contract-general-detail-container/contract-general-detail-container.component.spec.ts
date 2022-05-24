import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractGeneralDetailContainerComponent } from './contract-general-detail-container.component';
import { Store, StoreModule } from '@ngrx/store';

describe('ContractGeneralDetailContainerComponent', () => {
  let component: ContractGeneralDetailContainerComponent;
  let fixture: ComponentFixture<ContractGeneralDetailContainerComponent>;
  let store: Store;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ ContractGeneralDetailContainerComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractGeneralDetailContainerComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
