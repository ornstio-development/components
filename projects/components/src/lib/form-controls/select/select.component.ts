import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { AbstractControl, NG_VALUE_ACCESSOR } from '@angular/forms';

import { OrnstioOptionComponent } from './option/option.component';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { HostListener, ViewChild } from '@angular/core';
import { from, fromEvent, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ENTER, SPACE, DOWN_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { OrnstioInputComponent } from '../input/_input.index';
import { OrnstioSize } from '../../enums/ornstio.size.enum';

@Component({
  selector: 'ornstio-dropdown',
  template: ` <ng-template cdkPortal>
    <ng-content></ng-content>
  </ng-template>`,
})
export class OrnstioDropdownComponent implements OnDestroy {
  private _destroy$ = new Subject<void>();
  @Input()
  reference: HTMLElement;

  @ViewChild(CdkPortal)
  contentTemplate: CdkPortal;

  protected overlayRef: OverlayRef;

  isOpen = false;

  constructor(
    protected overlay: Overlay,
    private selectComponent: OrnstioSelectComponent
  ) {}

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.unsubscribe();
    this.close();
  }

  open(): void {
    this.overlayRef = this.overlay.create(
      new OverlayConfig({
        positionStrategy: this.overlay
          .position()
          .flexibleConnectedTo(this.reference)
          .withPush(false)
          .withPositions([
            {
              originX: 'start',
              originY: 'bottom',
              overlayX: 'start',
              overlayY: 'top',
            },
            {
              originX: 'start',
              originY: 'top',
              overlayX: 'start',
              overlayY: 'bottom',
            },
          ]),
        scrollStrategy: this.overlay.scrollStrategies.reposition(),
        hasBackdrop: true,
        backdropClass: 'cdk-overlay-transparent-backdrop',
        disposeOnNavigation: true,
      })
    );
    this.overlayRef.attach(this.contentTemplate);
    this.syncWidth();
    this.overlayRef
      .backdropClick()
      .pipe(
        tap(() => (this.selectComponent.value = this.selectComponent.value)),
        takeUntil(this._destroy$)
      )
      .subscribe(() => this.close());
    this.isOpen = true;
  }

  close(): void {
    this.overlayRef?.detach();
    this.isOpen = false;
  }

  @HostListener('window:resize')
  onWinResize(): void {
    this.syncWidth();
  }

  private syncWidth(): void {
    if (!this.overlayRef) {
      return;
    }

    const refRect = this.reference.getBoundingClientRect();
    this.overlayRef.updateSize({ width: refRect.width });
  }
}

@Component({
  selector: 'ornstio-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        /* istanbul ignore next */ () => OrnstioSelectComponent
      ),
      multi: true,
    },
  ],
})
export class OrnstioSelectComponent
  implements OnInit, AfterViewInit, OnDestroy {
  private _destroy$ = new Subject<void>();
  private _options: OrnstioOptionComponent[] = [];
  private _option: OrnstioOptionComponent;
  private _activeOption: OrnstioOptionComponent;
  private _color: string;
  private _focused: boolean;
  private _error: boolean;
  get filteredOptions(): OrnstioOptionComponent[] {
    return this._options.filter((o) => !o.hidden);
  }
  get option(): OrnstioOptionComponent {
    return this._activeOption ?? this._option;
  }
  set option(value: OrnstioOptionComponent) {
    this._option = value;
    this._option?.element?.scrollIntoView();
    this.changeDetectorRef.markForCheck();
  }
  text: string;

  @ViewChild(OrnstioDropdownComponent) dropdown: OrnstioDropdownComponent;
  @ViewChild(OrnstioInputComponent) inputComponent: OrnstioInputComponent;
  @ContentChildren(OrnstioOptionComponent)
  set options(options: QueryList<OrnstioOptionComponent>) {
    this._options = options?.toArray() ?? [];
  }
  private _value: any;
  get value(): any {
    return this._value;
  }
  @Input() set value(value: any) {
    this._value = value;
    this.option = this._options.first((o) => o.value === value);
    this.text = this.option?.text;
    this._activeOption = null;
    this.control?.patchValue(value);
    this.valueChange.next(this.value);
  }
  @Output() valueChange = new EventEmitter<any>();

  @Input() tabindex: number = 0;
  @Input() disabled: boolean = false;
  @Input() control: AbstractControl = null;
  @Input() size: OrnstioSize = OrnstioSize.Large;
  @Input() placeholder: string = '';
  get color(): string {
    return this.disabled
      ? 'disabled'
      : this.error
      ? 'error'
      : this._focused
      ? this._color
      : 'basic';
  }
  @Input() set color(color: string) {
    this._color = color;
  }
  get error(): boolean {
    return this._error || this.control?.invalid;
  }
  @Input() set error(value: boolean) {
    this._error = value;
  }
  @Input() filterable: boolean = true;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    fromEvent(this.inputComponent.inputElementRef.nativeElement, 'focus')
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        this._focused = true;
        this.filterOptions(null);
      });
    fromEvent(this.inputComponent.inputElementRef.nativeElement, 'focusout')
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => (this._focused = false));
    setTimeout(() => (this.value = this._value));
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.unsubscribe();
  }

  open(): void {
    this.dropdown.open();
    this._option?.element?.scrollIntoView();
  }

  close(): void {
    this.value = this.option?.value;
    this.dropdown.close();
    this.elementRef.nativeElement.focus();
  }

  filterOptions(value: string): void {
    this._options.forEach(
      (option) =>
        (option.hidden =
          this.filterable &&
          !!value &&
          !option.text
            .toLowerCase()
            .trim()
            .includes(value.toLowerCase().trim()))
    );
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (!this.dropdown.isOpen && event.key !== 'Tab') {
      this.open();
      this.filterOptions(null);
      return;
    }
    switch (event.key) {
      case 'Enter': {
        event.preventDefault();
        this.value = this.filteredOptions.first((o) => o.active)?.value;
        this.close();
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        const index = this.filteredOptions.indexOf(this.option) - 1;
        if (index > -1) {
          this._activeOption = this.filteredOptions[index];
          this._activeOption.element.scrollIntoView();
        }
        break;
      }
      case 'ArrowDown': {
        event.preventDefault();
        const index = this.filteredOptions.indexOf(this.option) + 1;
        if (index < this.filteredOptions.length) {
          this._activeOption = this.filteredOptions[index];
          this._activeOption.element.scrollIntoView({ inline: 'nearest' });
        }
        break;
      }
      case 'Tab': {
        this.close();
        break;
      }
    }
  }
}
