import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { OrnstioFormFieldComponent } from '../form-field/_form-field.index';
import { OrnstioInputComponent } from './input.component';
import { OrnstioInputModule } from './input.module';

describe('Input', () => {
  let component: OrnstioInputComponent;
  let fixture: ComponentFixture<OrnstioInputComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [OrnstioInputModule],
      providers: [OrnstioFormFieldComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrnstioInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should focus', fakeAsync(() => {
    component.inputElementRef.nativeElement.dispatchEvent(
      new FocusEvent('focus')
    );
    fixture.detectChanges();
    expect(component.focused).toBeTrue();
    component.inputElementRef.nativeElement.dispatchEvent(
      new FocusEvent('focusout')
    );
    fixture.detectChanges();
    expect(component.focused).toBeFalse();
  }));

  it('should set color', fakeAsync(() => {
    expect(component.color).toEqual('basic');

    component.color = 'primary';
    component.inputElementRef.nativeElement.dispatchEvent(
      new FocusEvent('focus')
    );
    fixture.detectChanges();
    expect(component.color).toEqual('primary');

    component.error = true;
    expect(component.color).toEqual('error');

    component.disabled = true;
    expect(component.color).toEqual('disabled');
  }));

  it('should two way bind', fakeAsync(() => {
    const form = new FormGroup({
      value: new FormControl(),
    });
    component.control = form.get('value');
    spyOn(component.control, 'patchValue');
    spyOn(component.valueChange, 'next');
    const value = 'Hello World';

    component.inputElementRef.nativeElement.value = value;
    component.inputElementRef.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    expect(component.control.patchValue).toHaveBeenCalled();
    expect(component.valueChange.next).toHaveBeenCalled();
    expect(component.value).toEqual(value);
  }));
});
