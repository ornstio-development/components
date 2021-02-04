import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAreaExampleComponent } from './text-area-example.component';

describe('TextAreaExampleComponent', () => {
  let component: TextAreaExampleComponent;
  let fixture: ComponentFixture<TextAreaExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextAreaExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAreaExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
