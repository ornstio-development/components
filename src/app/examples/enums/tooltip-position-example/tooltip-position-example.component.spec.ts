import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipPositionExampleComponent } from './tooltip-position-example.component';

describe('TooltipPositionExampleComponent', () => {
  let component: TooltipPositionExampleComponent;
  let fixture: ComponentFixture<TooltipPositionExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TooltipPositionExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TooltipPositionExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
