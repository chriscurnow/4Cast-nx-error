import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDetailContainerComponent } from './company-detail-container.component';

describe('CompanyDetailContainerComponent', () => {
  let component: CompanyDetailContainerComponent;
  let fixture: ComponentFixture<CompanyDetailContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyDetailContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyDetailContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
