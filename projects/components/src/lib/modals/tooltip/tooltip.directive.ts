import {
  ConnectedPosition,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  Directive,
  ElementRef,
  HostBinding,
  Injector,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { delay, map, takeUntil, tap } from 'rxjs/operators';
import { OrnstioTooltipPosition } from '../../enums/_enums.index';
import { OrnstioTooltipComponent } from './tooltip.component';

export const ORNSTIO_TOOLTIP_DATA = 'ORNSTIO_TOOLTIP_DATA';

@Directive({
  selector: '[ornstioTooltip]',
})
export class OrnstioTooltipDirective implements OnInit, OnDestroy {
  private _tooltipDelay$ = new Subject<void>();
  private _currentId: number;

  private _tooltipDelay: number = 0;
  get tooltipDelay(): number {
    return this._tooltipDelay;
  }

  @Input() set tooltipDelay(tooltipDelay: number) {
    this._tooltipDelay = tooltipDelay;
    this._tooltipDelay$.next();
    this.setup();
  }

  @Input() ornstioTooltip: string;
  @Input() tooltipPosition: OrnstioTooltipPosition =
    OrnstioTooltipPosition.Below;

  private _destroy$ = new Subject<void>();
  private _overlayRef: OverlayRef;

  @Input() tooltipColor: string;

  private _componentRef;
  componentRef<T>(): T {
    return this._componentRef;
  }

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    private _overlay: Overlay,
    private _injector: Injector
  ) {}

  ngOnInit(): void {
    this.setup();
  }

  private setup(): void {
    fromEvent(this._elementRef.nativeElement, 'mouseenter')
      .pipe(
        map(() => (this._currentId = Math.round(Math.random() * 1e18))),
        takeUntil(this._destroy$),
        takeUntil(this._tooltipDelay$),
        delay(+this.tooltipDelay)
      )
      .subscribe((id: number) => {
        if (id === this._currentId) {
          this.open();
        }
      });

    fromEvent(this._elementRef.nativeElement, 'mouseleave')
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        this._currentId = null;
        this.close();
      });
  }

  open(): void {
    this._overlayRef = this._overlay.create(
      new OverlayConfig({
        positionStrategy: this._overlay
          .position()
          .flexibleConnectedTo(this._elementRef.nativeElement)
          .withPush(false)
          .withPositions(this.getPositions(this.tooltipPosition)),
        scrollStrategy: this._overlay.scrollStrategies.reposition(),
        hasBackdrop: false,
        disposeOnNavigation: true,
      })
    );
    const injector = Injector.create({
      providers: [
        {
          useValue: { value: this.ornstioTooltip, color: this.tooltipColor },
          provide: ORNSTIO_TOOLTIP_DATA,
        },
      ],
      parent: this._injector,
    });

    const portal = new ComponentPortal(OrnstioTooltipComponent, null, injector);
    this._componentRef = this._overlayRef.attach(portal).instance;
  }

  close(): void {
    this._overlayRef?.detach();
  }

  ngOnDestroy(): void {
    this._tooltipDelay$.next();
    this._tooltipDelay$.unsubscribe();
    this._destroy$.next();
    this._destroy$.unsubscribe();
    this.close();
  }

  private getPositions(position: OrnstioTooltipPosition): ConnectedPosition[] {
    return [this.getPosition(position)].concat(
      Object.keys(OrnstioTooltipPosition)
        .map((key) => OrnstioTooltipPosition[key])
        .filter((p) => p !== position)
        .map((p) => this.getPosition(p))
    );
  }

  private getPosition(position: OrnstioTooltipPosition): ConnectedPosition {
    switch (position) {
      case OrnstioTooltipPosition.Left: {
        return {
          originX: 'start',
          originY: 'center',
          overlayX: 'end',
          overlayY: 'center',
          offsetX: -8,
        };
      }
      case OrnstioTooltipPosition.Right: {
        return {
          originX: 'end',
          originY: 'center',
          overlayX: 'start',
          overlayY: 'center',
          offsetX: 8,
        };
      }
      case OrnstioTooltipPosition.Above: {
        return {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
          offsetY: -8,
        };
      }
      default: {
        return {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
          offsetY: 8,
        };
      }
    }
  }
}
