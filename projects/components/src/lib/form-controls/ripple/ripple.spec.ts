import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrnstioRippleComponent } from './ripple.component';
import { OrnstioRippleDirective } from './ripple.directive';
import { OrnstioRippleModule } from './ripple.module';

@Component({
  template: ` <div
    ornstioRipple
    [color]="color"
    [duration]="duration"
    [disabled]="disabled"
    [centered]="centered"
  ></div>`,
})
class OrnstioRippleTestComponent {
  @ViewChild(OrnstioRippleDirective) ripple: OrnstioRippleDirective;

  colors = ['primary', 'secondary', 'warn', 'basic'];
  color: string = 'basic';
  disabled: boolean = false;
  duration: number = 500;
  centered: boolean = false;
}

describe('Ripple', () => {
  let component: OrnstioRippleTestComponent;
  let fixture: ComponentFixture<OrnstioRippleTestComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [OrnstioRippleTestComponent],
      imports: [OrnstioRippleModule],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrnstioRippleTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should ripple', (done) => {
    component.ripple.click({ x: 0, y: 0 } as MouseEvent);
    expect(component.ripple.elementRef.nativeElement.children.length).toBe(1);
    setTimeout(() => {
      expect(component.ripple.elementRef.nativeElement.children.length).toBe(0);
      done();
    }, component.ripple.duration + 100);
  });
});
