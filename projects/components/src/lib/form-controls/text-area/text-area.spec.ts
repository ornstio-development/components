import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { OrnstioFormFieldComponent } from '../form-field/_form-field.index';
import { OrnstioTextAreaComponent } from './text-area.component';
import { OrnstioTextAreaModule } from './text-area.module';
describe('Input', () => {
  let component: OrnstioTextAreaComponent;
  let fixture: ComponentFixture<OrnstioTextAreaComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [OrnstioTextAreaModule],
      providers: [OrnstioFormFieldComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrnstioTextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should focus', fakeAsync(() => {
    component.textareaElementRef.nativeElement.dispatchEvent(
      new FocusEvent('focus')
    );
    fixture.detectChanges();
    expect(component.focused).toBeTrue();
    component.textareaElementRef.nativeElement.dispatchEvent(
      new FocusEvent('focusout')
    );
    fixture.detectChanges();
    expect(component.focused).toBeFalse();
  }));

  it('should set color', fakeAsync(() => {
    expect(component.color).toEqual('basic');

    component.color = 'primary';
    component.textareaElementRef.nativeElement.dispatchEvent(
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

    component.textareaElementRef.nativeElement.value = value;
    component.textareaElementRef.nativeElement.dispatchEvent(
      new Event('input')
    );

    fixture.detectChanges();
    expect(component.control.patchValue).toHaveBeenCalled();
    expect(component.valueChange.next).toHaveBeenCalled();
    expect(component.value).toEqual(value);
  }));
});
