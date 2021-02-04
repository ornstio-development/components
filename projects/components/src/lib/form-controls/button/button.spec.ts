import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrnstioButtonComponent } from './button.component';
import { OrnstioButtonModule } from './button.module';

describe('Button', () => {
  let component: OrnstioButtonComponent;
  let fixture: ComponentFixture<OrnstioButtonComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [OrnstioButtonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrnstioButtonComponent);
    component = fixture.componentInstance;
    component.color = 'primary';
    fixture.detectChanges();
  });

  it('should override color when disabled', () => {
    component.disabled = true;
    expect(component.color).toEqual('disabled');
  });

  it('should blur after click', () => {
    spyOn(component.elementRef.nativeElement, 'blur');
    component.click();
    expect(component.elementRef.nativeElement.blur).toHaveBeenCalled();
  });
});
