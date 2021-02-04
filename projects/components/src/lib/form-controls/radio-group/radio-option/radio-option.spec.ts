import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrnstioRadioGroupComponent } from '../radio-group.component';
import { OrnstioRadioGroupModule } from '../radio-group.module';
import { OrnstioRadioOptionComponent } from './radio-option.component';

describe('Radio Option', () => {
  let component: OrnstioRadioOptionComponent;
  let fixture: ComponentFixture<OrnstioRadioOptionComponent>;

  describe('No Forward Ref', () => {
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [OrnstioRadioGroupModule],
        providers: [],
      }).compileComponents();
    });
    it('should throw error', () => {
      expect(() =>
        TestBed.createComponent(OrnstioRadioOptionComponent)
      ).toThrow();
    });
  });

  describe('Forward Ref', () => {
    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [OrnstioRadioGroupModule],
        providers: [OrnstioRadioGroupComponent],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(OrnstioRadioOptionComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should set value', () => {
      spyOn(component.radioGroup.valueChange, 'next');
      component.click();
      expect(component.radioGroup.valueChange.next).toHaveBeenCalled();
    });

    it('should not set value if disabled', () => {
      component.disabled = true;
      spyOn(component.radioGroup.valueChange, 'next');
      component.click();
      expect(component.radioGroup.valueChange.next).not.toHaveBeenCalled();
    });

    it('should be disabled if parent is disabled', () => {
      component.radioGroup.disabled = true;
      expect(component.disabled).toBeTrue();
    });
  });
});
