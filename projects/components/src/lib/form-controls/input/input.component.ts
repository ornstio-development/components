import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { OrnstioSize } from '../../enums/ornstio.size.enum';

@Component({
  selector: 'ornstio-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrnstioInputComponent implements AfterViewInit, OnDestroy {
  @Input() tabindex: number = 0;

  private _value: number | string;
  private _error: boolean;
  private _color: string;
  private _focused: boolean;
  private _destroy$ = new Subject<void>();
  get focused(): boolean {
    return this._focused;
  }

  @ViewChild('input', { static: true })
  inputElementRef: ElementRef<HTMLInputElement>;

  get classes(): string[] {
    return [
      this.size,
      this.color ?? '',
      this.error ? 'error' : '',
      !!this.prefix ? 'prefix' : '',
      !!this.suffix ? 'suffix' : '',
    ].filter((_) => !!_);
  }

  get iconClasses(): string[] {
    return [
      this.size,
      this.color,
      this.error ? 'error' : '',
      this.focused ? 'focus' : '',
    ].filter((_) => !!_);
  }

  public get value(): string | number {
    return this._value;
  }

  @Input() public set value(value: number | string) {
    this._value = value;
  }

  @Output() valueChange = new EventEmitter<string | number>();

  @Input() disabled: boolean;
  @Input() readonly: boolean;
  @Input() control: AbstractControl;
  @Input() size: OrnstioSize = OrnstioSize.Large;
  @Input() type:
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week' = 'text';

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
  @Input() prefix: string;
  @Input() suffix: string;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    fromEvent(this.inputElementRef.nativeElement, 'focus')
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        this._focused = true;
        this.changeDetectorRef.detectChanges();
      });
    fromEvent(this.inputElementRef.nativeElement, 'focusout')
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        this._focused = false;
        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.unsubscribe();
  }
}
