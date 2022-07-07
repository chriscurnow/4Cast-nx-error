import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailContainerComponent } from './project-detail-container.component';

describe('ProjectDetailContainerComponent', () => {
  let component: ProjectDetailContainerComponent;
  let fixture: ComponentFixture<ProjectDetailContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectDetailContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectDetailContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
