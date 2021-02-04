import {
  ComponentType,
  GlobalPositionStrategy,
  Overlay,
  OverlayContainer,
  OverlayRef,
} from '@angular/cdk/overlay';
import { ComponentPortal, PortalOutlet } from '@angular/cdk/portal';
import {
  ComponentFactoryResolver,
  Injectable,
  Injector,
  Optional,
  ViewContainerRef,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';

export const ORNSTIO_DIALOG_DATA = 'ORNSTIO_DIALOG_DATA';

export class OrnstioDialogConfig<T> {
  data?: T;
  closable?: boolean;
  width?: number | string;
  height?: number | string;
  panelClass?: string[];
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

@Injectable()
export class OrnstioDialogService {
  private _closed$ = new Subject<any>();
  private _overlayRef: OverlayRef;

  constructor(
    private overlay: Overlay,
    private injector: Injector,
    private resolver: ComponentFactoryResolver,
    @Optional() private router: Router
  ) {
    /* istanbul ignore next */
    this.router?.events.subscribe((e) => {
      /* istanbul ignore next */
      if (e instanceof NavigationEnd) {
        this.close();
      }
    });
  }

  open<T, U>(
    component: ComponentType<T>,
    config?: OrnstioDialogConfig<any>
  ): Observable<U> {
    this.close();
    this._overlayRef = this.overlay.create({
      positionStrategy: this.positionStrategy(config),
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: true,
      disposeOnNavigation: true,
      width: config?.width,
      height: config?.height,
      panelClass: ['ornstio-dialog-container'].concat(
        ...(config?.panelClass ?? [])
      ),
    });

    const injector = Injector.create({
      providers: [{ useValue: config?.data, provide: ORNSTIO_DIALOG_DATA }],
      parent: this.injector,
    });

    const portal = new ComponentPortal(
      component,
      null,
      injector,
      this.resolver
    );
    this._overlayRef.attach(portal);
    if (config?.closable) {
      this._overlayRef
        .backdropClick()
        .pipe(first(), takeUntil(this._closed$))
        .subscribe(() => this.close());
    }
    return this._closed$.pipe(first());
  }

  close(value?: any): void {
    this._overlayRef?.detach();
    this._closed$.next(value);
  }

  private positionStrategy<T>(
    config: OrnstioDialogConfig<T>
  ): GlobalPositionStrategy {
    let overlay = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();
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
