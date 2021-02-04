import { Injector } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrnstioInputComponent } from '../input/_input.index';
import { OrnstioSelectComponent } from '../select/_select.index';
import { OrnstioTextAreaComponent } from '../text-area/_text-area.index';
import { OrnstioFormFieldComponent } from './form-field.component';
import { OrnstioFormFieldModule } from './form-field.module';

describe('FormField', () => {
  let component: OrnstioFormFieldComponent;
  let fixture: ComponentFixture<OrnstioFormFieldComponent>;
  let injector: Injector;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [OrnstioFormFieldModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrnstioFormFieldComponent);
    injector = fixture.debugElement.injector;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should inject', () => {
    expect(
      injector.get(OrnstioFormFieldComponent) instanceof
        OrnstioFormFieldComponent
    ).toBeTrue();
  });

  it('should get basic color', () => {
    expect(component.color).toEqual('basic');
  });

  it('should get input color', () => {
    component.inputComponent = { color: 'primary' } as OrnstioInputComponent;
    expect(component.color).toEqual('primary');
  });

  it('should get select color', () => {
    component.selectComponent = {
      color: 'primary',
    } as OrnstioSelectComponent;
    expect(component.color).toEqual('primary');
  });

  it('should get input color', () => {
    component.textAreaComponent = {
      color: 'primary',
    } as OrnstioTextAreaComponent;
    expect(component.color).toEqual('primary');
  });
});
