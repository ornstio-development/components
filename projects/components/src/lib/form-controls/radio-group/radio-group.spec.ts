import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { OrnstioRadioGroupComponent } from './radio-group.component';
import { OrnstioRadioGroupModule } from './radio-group.module';

describe('Radio Group', () => {
  let component: OrnstioRadioGroupComponent;
  let fixture: ComponentFixture<OrnstioRadioGroupComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [OrnstioRadioGroupModule],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrnstioRadioGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should patch control', () => {
    component.control = new FormControl();
    spyOn(component.control, 'patchValue');
    component.value = 'Hello World';
    expect(component.control.patchValue).toHaveBeenCalled();
  });

  it('should set color', () => {
    expect(component.color).toEqual('basic');
    component.color = 'primary';
    expect(component.color).toEqual('primary');
  });
});
