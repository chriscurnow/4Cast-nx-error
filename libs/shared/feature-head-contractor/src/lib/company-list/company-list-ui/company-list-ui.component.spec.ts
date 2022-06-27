import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyListUiComponent } from './company-list-ui.component';

describe('CompanyListUiComponent', () => {
  let component: CompanyListUiComponent;
  let fixture: ComponentFixture<CompanyListUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyListUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyListUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
