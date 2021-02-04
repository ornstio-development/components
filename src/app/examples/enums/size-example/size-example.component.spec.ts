import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeExampleComponent } from './size-example.component';

describe('SizeExampleComponent', () => {
  let component: SizeExampleComponent;
  let fixture: ComponentFixture<SizeExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SizeExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SizeExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
