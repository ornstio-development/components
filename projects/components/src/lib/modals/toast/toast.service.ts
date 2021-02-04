import {
  ComponentType,
  GlobalPositionStrategy,
  Overlay,
  OverlayContainer,
  OverlayRef,
} from '@angular/cdk/overlay';
import { ComponentPortal, PortalOutlet } from '@angular/cdk/portal';
import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Injector,
  Optional,
  ViewContainerRef,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { OrnstioToastComponent } from './toast.component';

export const ORNSTIO_TOAST_DATA = 'ORNSTIO_TOAST_DATA';

export class OrnstioToastConfig<T> {
  data?: T;
  panelClass?: string[];
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  duration?: number;
}

@Injectable()
export class OrnstioToastService {
  private _closed$ = new Subject<void>();
  private _overlayRef: OverlayRef;
  private _timeout: number;

  private _componentRef: any;
  componentRef<T>(): T {
    return this._componentRef;
  }

  constructor(
    private overlay: Overlay,
    private injector: Injector,
    private resolver: ComponentFactoryResolver,
    @Optional() private router: Router
  ) {
    this.router?.events.subscribe((e) => {
      /* istanbul ignore next */
      if (e instanceof NavigationEnd) {
        this.close();
      }
    });
  }

  open<T>(
    value: string | ComponentType<T>,
    config?: OrnstioToastConfig<any>
  ): Observable<void> {
    this.close();
    this._overlayRef = this.overlay.create({
      positionStrategy: this.positionStrategy(config),
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: false,
      disposeOnNavigation: true,
      panelClass: ['ornstio-toast-container'].concat(
        ...(config?.panelClass ?? [])
      ),
    });

    const injector = Injector.create({
      providers: [
        {
          useValue: typeof value === 'string' ? value : config?.data,
          provide: ORNSTIO_TOAST_DATA,
        },
      ],
      parent: this.injector,
    });

    let component: ComponentType<any>;
    if (typeof value === 'string') {
      component = OrnstioToastComponent;
    } else {
      component = value;
    }

    const portal = new ComponentPortal(
      component,
      null,
      injector,
      this.resolver
    );
    this._componentRef = this._overlayRef.attach(portal).instance;
    if (!isNaN(config?.duration)) {
      this._timeout = setTimeout(() => this.close(), config.duration);
    }
    return this._closed$.pipe(first());
  }

  close(): void {
    clearTimeout(this._timeout);
    this._overlayRef?.detach();
    this._closed$.next();
  }

  private positionStrategy<T>(
    config?: OrnstioToastConfig<T>
  ): GlobalPositionStrategy {
    let overlay = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .bottom(`0px`);
    /* istanbul ignore next */
    if (config?.bottom) {
      overlay = overlay.bottom(config.bottom);
    }
    /* istanbul ignore next */
    if (config?.top) {
      overlay = overlay.top(config.top);
    }
    /* istanbul ignore next */
    if (config?.left) {
      overlay = overlay.left(config.left);
    }
    /* istanbul ignore next */
    if (config?.right) {
      overlay = overlay.right(config.right);
    }
    return overlay;
  }
}
