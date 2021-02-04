import { Component, ContentChild, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrnstioSelectComponent } from './select.component';
import { OrnstioSelectModule } from './select.module';

@Component({
  template:
    '<ornstio-select><ornstio-option [value]="0">0</ornstio-option><ornstio-option [value]="1">1</ornstio-option><ornstio-select>',
})
class OrnstioSelectTestComponent {
  @ViewChild(OrnstioSelectComponent) component: OrnstioSelectComponent;
}
describe('Select', () => {
  let component: OrnstioSelectComponent;
  let fixture: ComponentFixture<OrnstioSelectTestComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [OrnstioSelectTestComponent],
      imports: [OrnstioSelectModule],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrnstioSelectTestComponent);
    fixture.detectChanges();
    component = fixture.componentInstance.component;
    component.close();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hide option', () => {
    expect(component.filteredOptions.length).toEqual(2);
    component.filterOptions('1');
    expect(component.filteredOptions.length).toEqual(1);
  });

  it('should two way bind', () => {
    component.control = new FormControl();
    spyOn(component.control, 'patchValue');
    spyOn(component.valueChange, 'next');
    component.value = component.filteredOptions[0].value;
    expect(component.option).toEqual(component.filteredOptions[0]);
    expect(component.text).toEqual(component.option.text);
    expect(component.control.patchValue).toHaveBeenCalled();
    expect(component.valueChange.next).toHaveBeenCalled();
  });

  it('should change color', () => {
    component.color = 'primary';
    expect(component.color).toEqual('basic');
    component.inputComponent.inputElementRef.nativeElement.dispatchEvent(
      new FocusEvent('focus')
    );
    fixture.detectChanges();
    expect(component.color).toEqual('primary');
    component.control = new FormControl(null, [Validators.required]);
    expect(component.color).toEqual('error');
    component.control = null;
    component.error = true;
    fixture.detectChanges();
    expect(component.color).toEqual('error');
    component.disabled = true;
    expect(component.color).toEqual('disabled');
  });

  it('should open', () => {
    spyOn(component.dropdown, 'open');
    component.dropdown.open();
    expect(component.dropdown.open).toHaveBeenCalled();
  });

  it('should close', () => {
    spyOn(component.dropdown, 'close');
    component.option = component.filteredOptions[0];
    component.close();
    expect(component.value).toEqual(component.filteredOptions[0].value);
    expect(component.dropdown.close).toHaveBeenCalled();
  });

  it('should handle key binding when closed', () => {
    spyOn(component, 'open');
    spyOn(component, 'filterOptions');
    component.handleKeyDown({ key: 'Enter' } as KeyboardEvent);
    expect(component.open).toHaveBeenCalled();
    expect(component.filterOptions).toHaveBeenCalledWith(null);
  });

  it('should handle key binding when open', () => {
    component.open();
    component.handleKeyDown({
      key: 'ArrowDown',
      preventDefault: () => {},
    } as KeyboardEvent);
    component.handleKeyDown({
      key: 'ArrowDown',
      preventDefault: () => {},
    } as KeyboardEvent);
    component.handleKeyDown({
      key: 'Enter',
      preventDefault: () => {},
    } as KeyboardEvent);
    expect(component.option).toEqual(component.filteredOptions[1]);
    component.handleKeyDown({
      key: 'Enter',
      preventDefault: () => {},
    } as KeyboardEvent);
    component.handleKeyDown({
      key: 'ArrowUp',
      preventDefault: () => {},
    } as KeyboardEvent);
    component.handleKeyDown({
      key: 'Enter',
      preventDefault: () => {},
    } as KeyboardEvent);
    expect(component.option).toEqual(component.filteredOptions[0]);
    component.handleKeyDown({
      key: 'Enter',
      preventDefault: () => {},
    } as KeyboardEvent);
    spyOn(component, 'close');
    component.handleKeyDown({
      key: 'Tab',
      preventDefault: () => {},
    } as KeyboardEvent);
    expect(component.close).toHaveBeenCalled();
  });

  it('should close on click', () => {
    spyOn(component, 'close');
    component.filteredOptions[0].select({
      preventDefault: () => {},
      stopPropagation: () => {},
    } as UIEvent);
    expect(component.value).toEqual(component.filteredOptions[0].value);
    expect(component.close).toHaveBeenCalled();
  });
});
