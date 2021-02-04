import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeViewerExampleComponent } from './code-viewer-example.component';

describe('CodeViewerExampleComponent', () => {
  let component: CodeViewerExampleComponent;
  let fixture: ComponentFixture<CodeViewerExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeViewerExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeViewerExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
