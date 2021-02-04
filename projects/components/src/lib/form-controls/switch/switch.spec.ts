import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { OrnstioSwitchComponent } from './switch.component';
import { OrnstioSwitchModule } from './switch.module';

describe('Switch', () => {
  let component: OrnstioSwitchComponent;
  let fixture: ComponentFixture<OrnstioSwitchComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [OrnstioSwitchModule],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrnstioSwitchComponent);
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

  it('should not click if disabled', () => {
    component.disabled = true;
    component.click();
    expect(component.value).toBeFalse();
  });

  it('should change color', fakeAsync(() => {
    component.color = 'primary';
    expect(component.color).toEqual('basic');
    component.value = true;
    fixture.detectChanges();
    tick(100);
    expect(component.color).toEqual('primary');
    component.disabled = true;
    fixture.detectChanges();
    expect(component.color).toEqual('disabled');
  }));

  it('should not animate', fakeAsync(() => {
    component.inputElementRef.nativeElement.click();
    expect(component.classes.any((c) => c === 'no-animation')).toBeTrue();
    component.inputElementRef.nativeElement.click();
    fixture.detectChanges();
    expect(component.classes.any((c) => c === 'no-animation')).toBeFalse();
  }));
});
