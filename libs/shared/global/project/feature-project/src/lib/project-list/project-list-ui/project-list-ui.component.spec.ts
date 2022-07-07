import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListUiComponent } from './project-list-ui.component';

describe('ProjectListUiComponent', () => {
  let component: ProjectListUiComponent;
  let fixture: ComponentFixture<ProjectListUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectListUiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectListUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
