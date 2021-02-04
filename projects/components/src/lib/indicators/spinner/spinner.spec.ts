import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrnstioSpinnerComponent } from './spinner.component';
import { OrnstioSpinnerModule } from './spinner.module';

describe('Spinner', () => {
  let component: OrnstioSpinnerComponent;
  let fixture: ComponentFixture<OrnstioSpinnerComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [OrnstioSpinnerModule],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrnstioSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not error out', () => {
    component.spinner = null;
    expect(() => (component.size = 10)).not.toThrow();
  });

  it('should set size', () => {
    component.size = 100;
    expect(component.spinner.nativeElement.style.borderWidth).toEqual(
      `${100 * 0.15}px`
    );
  });
});
