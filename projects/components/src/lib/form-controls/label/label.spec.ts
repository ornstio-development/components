import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { OrnstioInputComponent } from '../input/input.component';
import { OrnstioLabelComponent } from './label.component';
import { OrnstioFormFieldComponent } from '../form-field/form-field.component';
import { OrnstioLabelModule } from './label.module';

describe('Label', () => {
  let component: OrnstioLabelComponent;
  let fixture: ComponentFixture<OrnstioLabelComponent>;

  describe('Form Field', () => {
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [OrnstioLabelModule],
        providers: [OrnstioFormFieldComponent],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(OrnstioLabelComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should inject form field', () => {
      expect(component.formField).toBeTruthy();
    });

    it('should change color', fakeAsync(() => {
      expect(component.color).toEqual('basic');
      component.formField.inputComponent = {
        color: 'primary',
      } as OrnstioInputComponent;
      expect(component.color).toEqual('primary');
    }));
  });

  describe('No Form Field', () => {
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [OrnstioLabelModule],
        providers: [],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(OrnstioLabelComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should not inject form field', () => {
      expect(component.formField).toBeFalsy();
    });

    it('should change color', fakeAsync(() => {
      expect(component.color).toEqual('basic');
      component.color = 'primary';
      expect(component.color).toEqual('primary');
    }));
  });
});
