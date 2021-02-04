import {
  Directive,
  ComponentFactoryResolver,
  OnInit,
  ViewContainerRef,
  Type,
  ComponentRef,
  OnDestroy,
  Component,
  Injector,
} from '@angular/core';
import { OrnstioDialogService } from './dialog.service';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ORNSTIO_DIALOG_DATA } from './dialog.constants';
@Directive({
  selector: '[ornstioDialogContainer]',
})
export class OrnstioDialogDirective implements OnInit, OnDestroy {
  private ref: ComponentRef<Component>;
  private destroy = new Subject<void>();
  private events = new Subject<void>();

  constructor(
    private viewContainerRef: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private dialogService: OrnstioDialogService,
    private injector: Injector
  ) {}

  ngOnInit(): void {
    this.dialogService.dialog$
      .pipe(takeUntil(this.destroy))
      .subscribe((output) => {
        this.close(null);
        if (output == null) {
          return;
        }
        this.open(output);
      });

    this.dialogService.close$
      .pipe(takeUntil(this.destroy))
      .subscribe((output) => {
        this.close(output);
      });
  }

  ngOnDestroy(): void {
    this.close();
    this.destroy.next();
    this.destroy.unsubscribe();
  }

  open(output: {
    component: Type<Component>;
    data: any;
    opts: { closeable: boolean };
  }): void {
    const injector = Injector.create({
      providers: [{ useValue: output.data, provide: ORNSTIO_DIALOG_DATA }],
      parent: this.injector,
    });
    const factory = this.resolver.resolveComponentFactory(output.component);
    this.ref = this.viewContainerRef.createComponent(factory, 0, injector);
    const container = this.buildDialogContainer(
      this.ref.location.nativeElement,
      output.opts
    );
    this.viewContainerRef.element.nativeElement.appendChild(container);
  }

  close(data?: any): void {
    this.events.next();
    if (this.ref != null) {
      this.ref.location.nativeElement.parentElement.remove();
      this.ref.destroy();
      this.ref = null;
      this.dialogService.close(data);
    }
  }

  buildDialogContainer(
    child: HTMLElement,
    opts: { closeable: boolean }
  ): HTMLDivElement {
    const element = document.createElement('div');
    element.appendChild(child);
    element.classList.add('dialog-container');
    if (opts?.closeable) {
      fromEvent(element, 'mousedown')
        .pipe(takeUntil(this.events))
        .subscribe(() => {
          this.close();
        });
      fromEvent(child, 'mousedown')
        .pipe(takeUntil(this.events))
        .subscribe((e) => {
          e.stopPropagation();
        });
    }
    return element;
  }
}
