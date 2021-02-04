import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { OrnstioCheckboxComponent } from './checkbox.component';
import { OrnstioCheckboxModule } from './checkbox.module';

describe('Checkbox', () => {
  let component: OrnstioCheckboxComponent;
  let fixture: ComponentFixture<OrnstioCheckboxComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [OrnstioCheckboxModule],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrnstioCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should two way bind', () => {
    component.control = new FormControl();
    spyOn(component.valueChange, 'next');
    spyOn(component.control, 'patchValue');
    expect(component.value).toBeFalse();
    component.inputElementRef.nativeElement.click();
    expect(component.value).toBeTrue();
    expect(component.control.patchValue).toHaveBeenCalled();
    expect(component.valueChange.next).toHaveBeenCalled();
  });

  it('should change color', fakeAsync(() => {
    component.color = 'primary';
    expect(component.color).toEqual('basic');
    component.click();
    fixture.detectChanges();
    tick(100);
    expect(component.color).toEqual('primary');
    component.disabled = true;
    fixture.detectChanges();
    expect(component.color).toEqual('disabled');
  }));

  it('should not click if disabled', () => {
    component.disabled = true;
    component.click();
    expect(component.value).toBeFalse();
  });
});
