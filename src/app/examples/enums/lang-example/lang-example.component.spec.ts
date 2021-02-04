import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LangExampleComponent } from './lang-example.component';

describe('LangExampleComponent', () => {
  let component: LangExampleComponent;
  let fixture: ComponentFixture<LangExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LangExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LangExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
