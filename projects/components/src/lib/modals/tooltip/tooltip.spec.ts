import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrnstioTooltipComponent } from './tooltip.component';
import { OrnstioTooltipDirective } from './tooltip.directive';
import { OrnstioTooltipModule } from './tooltip.module';

@Component({
  template: '<div #tooltip ornstioTooltip="Hello World"></div>',
})
class OrnstioTooltipTestComponent {
  @ViewChild('tooltip', { static: true }) tooltip: ElementRef<HTMLDivElement>;
  @ViewChild(OrnstioTooltipDirective, { static: true })
  directive: OrnstioTooltipDirective;
}

describe('Tooltip', () => {
  let component: OrnstioTooltipTestComponent;
  let fixture: ComponentFixture<OrnstioTooltipTestComponent>;
  const tooltipOpen = () => {
    let element = component.tooltip.nativeElement;
    let e = document.createEvent('Events');
    e.initEvent('mouseenter', true, false);
    element.dispatchEvent(e);
  };

  const tooltipClose = () => {
    let element = component.tooltip.nativeElement;
    let e = document.createEvent('Events');
    e.initEvent('mouseleave', true, false);
    element.dispatchEvent(e);
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [OrnstioTooltipTestComponent],
      imports: [OrnstioTooltipModule],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrnstioTooltipTestComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    component.directive.close();
  });

  it('should open and close', (done) => {
    spyOn(component.directive, 'open').and.callThrough();
    spyOn(component.directive, 'close').and.callThrough();

    tooltipOpen();
    setTimeout(() => {
      expect(component.directive.open).toHaveBeenCalled();
      tooltipClose();
      setTimeout(() => {
        expect(component.directive.close).toHaveBeenCalled();
        done();
      });
    });
  });

  it('should set delay', (done) => {
    spyOn(component.directive, 'open').and.callThrough();
    component.directive.tooltipDelay = 500;
    tooltipOpen();
    setTimeout(() => expect(component.directive.open).not.toHaveBeenCalled());
    setTimeout(() => {
      expect(component.directive.open).toHaveBeenCalled();
      done();
    }, 600);
  });

  it('should not set color', (done) => {
    tooltipOpen();
    setTimeout(() => {
      expect(
        component.directive
          .componentRef<OrnstioTooltipComponent>()
          .classes.any((c) => c === 'basic')
      ).toBeTrue();
      done();
    });
  });

  it('should set color', (done) => {
    component.directive.tooltipColor = 'primary';
    tooltipOpen();
    setTimeout(() => {
      expect(
        component.directive
          .componentRef<OrnstioTooltipComponent>()
          .classes.any((c) => c === 'primary')
      ).toBeTrue();
      done();
    });
  });

  it('should not open twice', (done) => {
    spyOn(component.directive, 'open');
    component.directive.tooltipDelay = 250;
    tooltipOpen();
    tooltipOpen();
    setTimeout(() => {
      expect(component.directive.open).toHaveBeenCalledTimes(1);
      done();
    }, 500);
  });
});
