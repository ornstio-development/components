import { Injectable, Type, Component, Optional } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Router, NavigationStart } from '@angular/router';
import { ComponentType } from '@angular/cdk/portal';

@Injectable()
export class OrnstioDialogService {
  private _dialog = new Subject<{
    component: Type<Component>;
    data: any;
    opts: { closeable: boolean };
  }>();
  get dialog$(): Observable<{
    component: Type<Component>;
    data: any;
    opts: { closeable: boolean };
  }> {
    return this._dialog;
  }
  private _close = new Subject<{}>();
  get close$(): Observable<{}> {
    return this._close;
  }
  private _isOpen = false;
  get isOpen(): boolean {
    return this._isOpen;
  }

  constructor(@Optional() router: Router) {
    router?.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.close();
      }
    });
  }

  open<T, U, V>(
    component: ComponentType<T>,
    data?: U,
    opts?: { closeable: boolean }
  ): Observable<V> {
    this._isOpen = true;
    this._dialog.next({ component, data, opts });
    return this._close.pipe(
      map((value) => value as V),
      first()
    );
  }

  close<T>(value?: T): void {
    this._isOpen = false;
    this._close.next(value);
  }
}
