import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Inject,
  Injector,
  Input,
  OnDestroy,
  ViewContainerRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  OrnstioRippleComponent,
  ORNSTIO_RIPPLE_DATA,
} from './ripple.component';

@Directive({
  selector: '[ornstioRipple]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        /* istanbul ignore next */ () => OrnstioRippleDirective
      ),
      multi: true,
    },
  ],
})
export class OrnstioRippleDirective implements OnDestroy {
  @Input() color: string = 'basic';
  @Input() centered: boolean;
  @Input() duration: number = 250;
  @Input() disabled: boolean = false;
  private _ref: ComponentRef<OrnstioRippleComponent>;
  private _timeout: number;

  constructor(
    public readonly elementRef: ElementRef<HTMLElement>,
    private viewContainerRef: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private injector: Injector
  ) {
    this.elementRef.nativeElement.style.position = 'relative';
    this.elementRef.nativeElement.style.overflow = 'hidden';
  }

  @HostListener('click', ['$event']) click($event: MouseEvent): void {
    if (this.disabled) {
      return;
    }
    this.dispose();
    const injector = Injector.create({
      providers: [{ provide: ORNSTIO_RIPPLE_DATA, useValue: $event }],
      parent: this.injector,
    });
    const factory = this.resolver.resolveComponentFactory(
      OrnstioRippleComponent
    );
    this._ref = this.viewContainerRef.createComponent(factory, 0, injector);
    this.viewContainerRef.element.nativeElement.appendChild(
      this._ref.location.nativeElement
    );
    this._timeout = setTimeout(() => this.dispose(), this.duration + 100);
  }

  private dispose(): void {
    clearTimeout(this._timeout);
    this._ref?.location.nativeElement.remove();
    this._ref?.destroy();
    this._ref = null;
  }

  ngOnDestroy(): void {
    this.dispose();
  }
}
